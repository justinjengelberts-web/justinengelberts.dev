"use client";

import { useState, useMemo } from "react";

// Thematic industry mapping (subset of the real 200+ terms)
const INDUSTRY_MAPPING: Record<string, string[]> = {
  // Horeca
  'horeca': ['I', '55', '56'],
  'hotel': ['55'], 'hotels': ['55'],
  'restaurant': ['56.10'], 'restaurants': ['56.10'],
  'café': ['56.30'], 'cafés': ['56.30'],
  'cafe': ['56.30'], 'cafes': ['56.30'],
  'bar': ['56.30'], 'bars': ['56.30'],
  'catering': ['56.21'],
  // Bouw
  'bouw': ['F', '41', '42', '43'],
  'aannemer': ['41.20'], 'aannemers': ['41.20'],
  'elektricien': ['43.21'], 'elektriciens': ['43.21'],
  'loodgieter': ['43.22'], 'loodgieters': ['43.22'],
  'schilder': ['43.34'], 'schilders': ['43.34'],
  // Handel
  'winkel': ['G', '47'], 'winkels': ['G', '47'],
  'supermarkt': ['47.11'], 'supermarkten': ['47.11'],
  'bakker': ['10.71', '47.24'], 'bakkers': ['10.71', '47.24'],
  'slager': ['10.11', '47.22'], 'slagers': ['10.11', '47.22'],
  // Zorg
  'zorg': ['Q', '86', '87', '88'],
  'dokter': ['86.21'], 'dokters': ['86.21'],
  'huisarts': ['86.21'], 'huisartsen': ['86.21'],
  'tandarts': ['86.23'], 'tandartsen': ['86.23'],
  'apotheek': ['47.73'], 'apotheken': ['47.73'],
  // Juridisch
  'advocaat': ['69.10'], 'advocaten': ['69.10'],
  'notaris': ['69.10'], 'notarissen': ['69.10'],
  // IT
  'software': ['62.01'],
  'webdesign': ['62.01'],
  'it': ['J', '62', '63'],
  // Transport
  'transport': ['H', '49', '50', '51', '52'],
  'taxi': ['49.32'], "taxi's": ['49.32'],
  // Schoonheid
  'kapper': ['96.02'], 'kappers': ['96.02'],
  'kapsalon': ['96.02'], 'kapsalons': ['96.02'],
  'schoonheidssalon': ['96.02'],
};

interface NaceNode {
  code: string;
  label: string;
  count: number;
  children?: NaceNode[];
  expanded?: boolean;
}

// Mock NACE tree data matching Ad Hoc Data structure
const NACE_TREE: NaceNode[] = [
  {
    code: "A",
    label: "Landbouw, Bosbouw En Visserij",
    count: 45230,
    children: [
      { code: "01", label: "Teelt Van Gewassen, Veeteelt", count: 32100 },
      { code: "02", label: "Bosbouw En Houtoogst", count: 8450 },
      { code: "03", label: "Visserij En Aquacultuur", count: 4680 },
    ]
  },
  {
    code: "B",
    label: "Winning Van Delfstoffen",
    count: 1230,
    children: [
      { code: "08", label: "Overige Winning Van Delfstoffen", count: 1230 },
    ]
  },
  {
    code: "C",
    label: "Industrie",
    count: 89450,
    children: [
      {
        code: "10",
        label: "Vervaardiging Van Voedingsmiddelen",
        count: 12340,
        children: [
          { code: "10.11", label: "Verwerking En Conservering Van Vlees", count: 2340 },
          { code: "10.71", label: "Vervaardiging Van Brood En Vers Banketbakkerswerk", count: 4560 },
        ]
      },
    ]
  },
  {
    code: "D",
    label: "Productie En Distributie Van Elektriciteit, Gas, Stoom En Gekoelde Lucht",
    count: 3450,
  },
  {
    code: "E",
    label: "Distributie Van Water; Afval- En Afvalwaterbeheer En Sanering",
    count: 4560,
  },
  {
    code: "F",
    label: "Bouwnijverheid",
    count: 156780,
    children: [
      {
        code: "41",
        label: "Bouw Van Gebouwen",
        count: 45600,
        children: [
          { code: "41.10", label: "Ontwikkeling Van Bouwprojecten", count: 12300 },
          { code: "41.20", label: "Burgerlijke En Utiliteitsbouw", count: 33300 },
        ]
      },
      {
        code: "43",
        label: "Gespecialiseerde Bouwwerkzaamheden",
        count: 78900,
        children: [
          { code: "43.21", label: "Elektrotechnische Installatiewerken", count: 23400 },
          { code: "43.22", label: "Loodgieterswerk, Installatie Verwarming", count: 18700 },
          { code: "43.34", label: "Schilderen En Glaszetten", count: 15600 },
        ]
      },
    ]
  },
  {
    code: "G",
    label: "Groot- En Detailhandel",
    count: 234560,
    children: [
      {
        code: "47",
        label: "Detailhandel",
        count: 156000,
        children: [
          { code: "47.11", label: "Supermarkten En Dergelijke Winkels", count: 8900 },
          { code: "47.22", label: "Winkels In Vlees En Vleeswaren", count: 3200 },
          { code: "47.24", label: "Winkels In Brood En Banketbakkerswerk", count: 5600 },
          { code: "47.73", label: "Apotheken", count: 4500 },
        ]
      },
    ]
  },
  {
    code: "H",
    label: "Vervoer En Opslag",
    count: 67890,
    children: [
      {
        code: "49",
        label: "Vervoer Te Land",
        count: 45600,
        children: [
          { code: "49.32", label: "Vervoer Per Taxi", count: 8900 },
          { code: "49.41", label: "Goederenvervoer Over De Weg", count: 28700 },
        ]
      },
    ]
  },
  {
    code: "I",
    label: "Verschaffen Van Accommodatie En Maaltijden",
    count: 78650,
    children: [
      {
        code: "55",
        label: "Verschaffen Van Accommodatie",
        count: 12340,
        children: [
          { code: "55.10", label: "Hotels En Dergelijke Accommodatie", count: 8900 },
          { code: "55.20", label: "Vakantieverblijven", count: 3440 },
        ]
      },
      {
        code: "56",
        label: "Eet- En Drinkgelegenheden",
        count: 66310,
        children: [
          { code: "56.10", label: "Restaurants En Mobiele Eetgelegenheden", count: 34500 },
          { code: "56.21", label: "Catering", count: 7800 },
          { code: "56.30", label: "Cafés En Bars", count: 24010 },
        ]
      },
    ]
  },
  {
    code: "J",
    label: "Informatie En Communicatie",
    count: 45670,
    children: [
      {
        code: "62",
        label: "Computerprogrammering En Consultancy",
        count: 34500,
        children: [
          { code: "62.01", label: "Ontwikkelen En Produceren Van Software", count: 28900 },
          { code: "62.02", label: "Computeradviesbureaus", count: 5600 },
        ]
      },
    ]
  },
  {
    code: "M",
    label: "Vrije Beroepen En Wetenschappelijke Activiteiten",
    count: 123450,
    children: [
      {
        code: "69",
        label: "Rechtskundige En Boekhoudkundige Dienstverlening",
        count: 45600,
        children: [
          { code: "69.10", label: "Rechtskundige Dienstverlening", count: 23400 },
          { code: "69.20", label: "Accountants En Belastingadviseurs", count: 22200 },
        ]
      },
    ]
  },
  {
    code: "Q",
    label: "Menselijke Gezondheidszorg En Maatschappelijke Dienstverlening",
    count: 167890,
    children: [
      {
        code: "86",
        label: "Menselijke Gezondheidszorg",
        count: 89000,
        children: [
          { code: "86.10", label: "Ziekenhuizen", count: 12300 },
          { code: "86.21", label: "Huisartspraktijken", count: 34500 },
          { code: "86.23", label: "Tandartspraktijken", count: 18900 },
        ]
      },
    ]
  },
  {
    code: "S",
    label: "Overige Diensten",
    count: 89450,
    children: [
      {
        code: "96",
        label: "Overige Persoonlijke Diensten",
        count: 56700,
        children: [
          { code: "96.02", label: "Haar- En Schoonheidsverzorging", count: 34500 },
          { code: "96.04", label: "Sauna's, Zonnebanken, Fitnesscentra", count: 12300 },
        ]
      },
    ]
  },
];

function getThematicCodes(searchTerm: string): string[] {
  const term = searchTerm.toLowerCase().trim();
  return INDUSTRY_MAPPING[term] || [];
}

function nodeMatchesSearch(node: NaceNode, searchTerm: string, thematicCodes: string[]): boolean {
  const term = searchTerm.toLowerCase();
  const labelMatch = node.label.toLowerCase().includes(term);
  const codeMatch = node.code.toLowerCase().includes(term);
  const thematicMatch = thematicCodes.some(tc =>
    node.code === tc || node.code.startsWith(tc + '.') || tc.startsWith(node.code)
  );
  return labelMatch || codeMatch || thematicMatch;
}

function isThematicMatch(node: NaceNode, thematicCodes: string[]): boolean {
  return thematicCodes.some(tc =>
    node.code === tc || node.code.startsWith(tc + '.') || tc.startsWith(node.code)
  );
}

export function NaceSearchPreview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(new Set());
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [showCTA, setShowCTA] = useState(false);

  const thematicCodes = useMemo(() => getThematicCodes(searchTerm), [searchTerm]);
  const hasThematicMatch = thematicCodes.length > 0;

  // Filter and process tree based on search
  const processedTree = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) {
      return NACE_TREE;
    }

    const filterTree = (nodes: NaceNode[]): NaceNode[] => {
      return nodes.map(node => {
        const children = node.children ? filterTree(node.children) : undefined;
        const childrenMatch = children && children.some(c => !(c as NaceNode & { hidden?: boolean }).hidden);
        const selfMatches = nodeMatchesSearch(node, searchTerm, thematicCodes);

        return {
          ...node,
          children,
          hidden: !selfMatches && !childrenMatch,
          expanded: selfMatches || childrenMatch,
          thematicMatch: isThematicMatch(node, thematicCodes),
        };
      }).filter(n => !(n as NaceNode & { hidden?: boolean }).hidden);
    };

    return filterTree(NACE_TREE);
  }, [searchTerm, thematicCodes]);

  const toggleExpand = (code: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allCodes = new Set<string>();
    const collectCodes = (nodes: NaceNode[]) => {
      for (const node of nodes) {
        if (node.children) {
          allCodes.add(node.code);
          collectCodes(node.children);
        }
      }
    };
    collectCodes(NACE_TREE);
    setExpandedNodes(allCodes);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  const toggleSelect = (code: string) => {
    setSelectedCodes(prev => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  };

  const totalSelected = useMemo(() => {
    let total = 0;
    const findCount = (nodes: NaceNode[]) => {
      for (const node of nodes) {
        if (selectedCodes.has(node.code)) {
          total += node.count;
        }
        if (node.children) {
          findCount(node.children);
        }
      }
    };
    findCount(NACE_TREE);
    return total;
  }, [selectedCodes]);

  // Base company count (1.2M as shown on Ad Hoc Data)
  const baseCount = 1200950;
  const displayCount = selectedCodes.size > 0 ? totalSelected : baseCount;

  const renderNode = (node: NaceNode & { hidden?: boolean; thematicMatch?: boolean; expanded?: boolean }, level: number = 0) => {
    if (node.hidden) return null;

    const isExpanded = expandedNodes.has(node.code) || node.expanded;
    const isSelected = selectedCodes.has(node.code);
    const hasChildren = node.children && node.children.length > 0;
    const isThematic = node.thematicMatch;

    return (
      <div key={node.code}>
        <div
          className={`flex items-center gap-2 py-2 px-3 border-b border-gray-100 transition-colors hover:bg-gray-50 ${
            isThematic ? 'bg-orange-50' : ''
          } ${isSelected ? 'bg-blue-50' : ''}`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
        >
          {/* Expand/Collapse Arrow */}
          {hasChildren ? (
            <button
              onClick={() => toggleExpand(node.code)}
              className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              <svg
                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div className="w-5" />
          )}

          {/* Checkbox (circle style like Ad Hoc Data) */}
          <button
            onClick={() => toggleSelect(node.code)}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              isSelected
                ? 'bg-[#1e3a8a] border-[#1e3a8a]'
                : 'border-gray-300 hover:border-gray-400 bg-white'
            }`}
          >
            {isSelected && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Code Badge */}
          <span className={`px-2 py-0.5 text-xs font-bold rounded ${
            isThematic
              ? 'bg-orange-100 text-orange-700'
              : 'bg-[#1e3a8a] text-white'
          }`}>
            {node.code}
          </span>

          {/* Label */}
          <span className={`text-sm flex-1 ${isThematic ? 'text-orange-700 font-medium' : 'text-gray-700'}`}>
            {node.code} - {node.label}
          </span>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderNode(child as NaceNode & { hidden?: boolean; thematicMatch?: boolean; expanded?: boolean }, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-[#f0f2f5] overflow-hidden font-sans p-3 md:p-4">
      <div className="flex gap-3 md:gap-4 h-full">
        {/* Left Sidebar - Filter Categories */}
        <div className="hidden md:flex w-44 flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </div>
          </div>
          <div className="flex-1 py-1">
            <div className="px-3 py-1.5 text-[10px] text-gray-400 uppercase tracking-wider">Basis</div>
            <button className="w-full px-3 py-2 text-left text-sm bg-blue-50 text-[#1e3a8a] font-medium border-l-2 border-[#1e3a8a] flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Branche (NACE)
            </button>
            {['Organisatiegrootte', 'Rechtsvorm', 'Locatie'].map((item) => (
              <button key={item} className="w-full px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#1e3a8a] rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <span className="text-base font-semibold text-gray-800">Branche (NACE-BEL 2025)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <button className="text-[#1e3a8a] hover:underline font-medium">Alles</button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => setSelectedCodes(new Set())}
              className="text-[#1e3a8a] hover:underline font-medium"
            >
              Wissen
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
          Selecteer de branche(s) waarop u wilt filteren. U kunt meerdere branches selecteren.
        </div>

        {/* Search Input */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Zoek op code of thema (bijv. horeca)"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Thematic Match Indicator */}
          {hasThematicMatch && (
            <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg">
              <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              <span className="text-sm text-orange-700">
                Thematisch zoeken: <strong>"{searchTerm}"</strong>
                <span className="text-orange-500 ml-1">→ {thematicCodes.join(', ')}</span>
              </span>
            </div>
          )}
        </div>

        {/* Expand/Collapse Buttons */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100 bg-gray-50">
          <button
            onClick={expandAll}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Uitklappen
          </button>
          <button
            onClick={collapseAll}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
            </svg>
            Inklappen
          </button>
        </div>

        {/* Tree Content */}
        <div className="flex-1 overflow-y-auto">
          {processedTree.length > 0 ? (
            processedTree.map(node => renderNode(node as NaceNode & { hidden?: boolean; thematicMatch?: boolean; expanded?: boolean }))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 py-8">
              <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm">Geen resultaten gevonden</span>
            </div>
          )}
        </div>
        </div>

        {/* Right Sidebar - Company Count (like Ad Hoc Data) */}
        <div className="w-44 md:w-52 flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          {/* Count Display */}
        <div className="p-4 border-b border-gray-200 text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Aantal bedrijven</div>
          <div className="text-3xl font-bold text-[#1e3a8a]">
            {displayCount.toLocaleString('nl-BE')}
          </div>
          <div className="text-xs text-green-600 font-medium uppercase">
            bedrijven gevonden
          </div>
          <div className="text-[10px] text-gray-400 mt-1">op basis van uw filters</div>
        </div>

        {/* Middle Section - Tips OR Selection */}
        <div className="flex-1 p-4 overflow-y-auto">
          {selectedCodes.size === 0 ? (
            <>
              <div className="flex items-start gap-2 mb-3">
                <svg className="w-8 h-8 text-[#1e3a8a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">Klaar om te filteren?</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Stel uw ideale doelgroep samen door branches te selecteren.</p>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-2 font-medium">Snelstart tips:</div>
              <ul className="text-xs text-gray-500 space-y-1">
                <li className="flex items-start gap-1">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Zoek op thema (horeca, bakker)
                </li>
                <li className="flex items-start gap-1">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Selecteer meerdere codes
                </li>
                <li className="flex items-start gap-1">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Check de teller live rechts
                </li>
              </ul>
            </>
          ) : (
            <>
              <div className="text-xs text-gray-500 mb-2 font-medium">Geselecteerde branches:</div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from(selectedCodes).map(code => (
                  <span
                    key={code}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-[#1e3a8a] text-white rounded text-xs"
                  >
                    {code}
                    <button
                      onClick={() => toggleSelect(code)}
                      className="hover:text-gray-200"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedCodes(new Set())}
                className="mt-3 text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Wis selectie
              </button>
            </>
          )}
        </div>

        {/* Export Button */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => setShowCTA(true)}
            disabled={selectedCodes.size === 0}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              selectedCodes.size > 0
                ? 'bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]/90'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Selectie Exporteren
          </button>
        </div>
      </div>
      </div>

      {/* CTA Overlay */}
      {showCTA && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="bg-white rounded-xl p-6 mx-4 max-w-sm text-center shadow-2xl">
            <div className="w-14 h-14 mx-auto mb-4 bg-[#1e3a8a]/10 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-[#1e3a8a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {totalSelected.toLocaleString('nl-BE')} bedrijven geselecteerd
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Dit is een demo. Wil je deze bedrijven exporteren naar CSV of Excel? Probeer de echte selectietool op Ad Hoc Data.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCTA(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Verder testen
              </button>
              <a
                href="https://www.adhocdata.be/selecties-2026-justin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                Probeer het zelf
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Demo Badge */}
    </div>
  );
}
