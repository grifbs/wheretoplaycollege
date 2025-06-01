import { useState } from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Checkbox } from './components/ui/checkbox';
import { Select } from './components/ui/select';
import jsPDF from 'jspdf';

const colleges = [
  {
    name: 'Duke University',
    state: 'NC',
    sat: 1480,
    act: 33,
    inStateTuition: 60435,
    outStateTuition: 60435,
    mensLax: true,
    womensLax: true,
    website: 'https://duke.edu',
    teamPage: 'https://goduke.com/sports/mens-lacrosse',
    acceptanceRate: 8,
    review: 'https://www.niche.com/colleges/duke-university/',
    division: 'DI'
  },
  // Add more college entries here...
];

export default function LacrosseCollegeFinder() {
  const [query, setQuery] = useState('');
  const [minSAT, setMinSAT] = useState(0);
  const [maxTuition, setMaxTuition] = useState(70000);
  const [mensLax, setMensLax] = useState(false);
  const [womensLax, setWomensLax] = useState(false);
  const [minACT, setMinACT] = useState(0);
  const [maxAcceptanceRate, setMaxAcceptanceRate] = useState(100);
  const [stateFilter, setStateFilter] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (college) => {
    setFavorites(prev => {
      return prev.includes(college)
        ? prev.filter(fav => fav !== college)
        : [...prev, college];
    });
  };

  const emailBody = encodeURIComponent(
    favorites.map(c => `${c.name} - ${c.website}`).join('\n')
  );
  const mailtoLink = `mailto:?subject=Lacrosse College List&body=${emailBody}`;

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Favorite Colleges:", 10, 10);
    favorites.forEach((fav, i) => {
      doc.text(`${i + 1}. ${fav.name} - ${fav.website}`, 10, 20 + i * 10);
    });
    doc.save("lacrosse_college_list.pdf");
  };

  const filtered = colleges.filter(college => {
    const matchesName = college.name.toLowerCase().includes(query.toLowerCase());
    const matchesSAT = college.sat >= minSAT;
    const matchesACT = college.act >= minACT;
    const matchesTuition = college.inStateTuition <= maxTuition || college.outStateTuition <= maxTuition;
    const matchesMens = !mensLax || college.mensLax;
    const matchesWomens = !womensLax || college.womensLax;
    const matchesAcceptance = college.acceptanceRate <= maxAcceptanceRate;
    const matchesState = stateFilter === '' || college.state.toLowerCase() === stateFilter.toLowerCase();
    const matchesDivision = divisionFilter === '' || college.division === divisionFilter;
    return matchesName && matchesSAT && matchesACT && matchesTuition && matchesMens && matchesWomens && matchesAcceptance && matchesState && matchesDivision;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lacrosse College Finder</h1>
      <div className="mb-4 text-center border border-gray-300 rounded p-4 bg-gray-50 text-gray-600">
        Your ad could go here (Google AdSense placeholder)
      </div>
      <Input
        placeholder="Search by school name..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="mb-4"
      />
      <Button onClick={() => setShowFilters(!showFilters)} className="mb-4">
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </Button>
      {/* ...rest of the app remains unchanged */}
    </div>
  );
}
