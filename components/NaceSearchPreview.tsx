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

// Mock NACE tree data
const NACE_TREE: NaceNode[] = [
  {
    code: "A",
    label: "Landbouw, bosbouw en visserij",
    count: 45230,
    children: [
      { code: "01", label: "Teelt van gewassen, veeteelt", count: 32100 },
      { code: "02", label: "Bosbouw en houtoogst", count: 8450 },
      { code: "03", label: "Visserij en aquacultuur", count: 4680 },
    ]
  },
  {
    code: "C",
    label: "Industrie",
    count: 89450,
    children: [
      {
        code: "10",
        label: "Vervaardiging van voedingsmiddelen",
        count: 12340,
        children: [
          { code: "10.11", label: "Verwerking en conservering van vlees", count: 2340 },
          { code: "10.71", label: "Vervaardiging van brood en vers banketbakkerswerk", count: 4560 },
        ]
      },
    ]
  },
  {
    code: "F",
    label: "Bouwnijverheid",
    count: 156780,
    children: [
      {
        code: "41",
        label: "Bouw van gebouwen",
        count: 45600,
        children: [
          { code: "41.10", label: "Ontwikkeling van bouwprojecten", count: 12300 },
          { code: "41.20", label: "Burgerlijke en utiliteitsbouw", count: 33300 },
        ]
      },
      {
        code: "43",
        label: "Gespecialiseerde bouwwerkzaamheden",
        count: 78900,
        children: [
          { code: "43.21", label: "Elektrotechnische installatiewerken", count: 23400 },
          { code: "43.22", label: "Loodgieterswerk, installatie verwarming", count: 18700 },
          { code: "43.34", label: "Schilderen en glaszetten", count: 15600 },
        ]
      },
    ]
  },
  {
    code: "G",
    label: "Groot- en detailhandel",
    count: 234560,
    children: [
      {
        code: "47",
        label: "Detailhandel",
        count: 156000,
        children: [
          { code: "47.11", label: "Supermarkten en dergelijke winkels", count: 8900 },
          { code: "47.22", label: "Winkels in vlees en vleeswaren", count: 3200 },
          { code: "47.24", label: "Winkels in brood en banketbakkerswerk", count: 5600 },
          { code: "47.73", label: "Apotheken", count: 4500 },
        ]
      },
    ]
  },
  {
    code: "H",
    label: "Vervoer en opslag",
    count: 67890,
    children: [
      {
        code: "49",
        label: "Vervoer te land",
        count: 45600,
        children: [
          { code: "49.32", label: "Vervoer per taxi", count: 8900 },
          { code: "49.41", label: "Goederenvervoer over de weg", count: 28700 },
        ]
      },
    ]
  },
  {
    code: "I",
    label: "Verschaffen van accommodatie en maaltijden",
    count: 78650,
    children: [
      {
        code: "55",
        label: "Verschaffen van accommodatie",
        count: 12340,
        children: [
          { code: "55.10", label: "Hotels en dergelijke accommodatie", count: 8900 },
          { code: "55.20", label: "Vakantieverblijven", count: 3440 },
        ]
      },
      {
        code: "56",
        label: "Eet- en drinkgelegenheden",
        count: 66310,
        children: [
          { code: "56.10", label: "Restaurants en mobiele eetgelegenheden", count: 34500 },
          { code: "56.21", label: "Catering", count: 7800 },
          { code: "56.30", label: "Cafés en bars", count: 24010 },
        ]
      },
    ]
  },
  {
    code: "J",
    label: "Informatie en communicatie",
    count: 45670,
    children: [
      {
        code: "62",
        label: "Computerprogrammering en consultancy",
        count: 34500,
        children: [
          { code: "62.01", label: "Ontwikkelen en produceren van software", count: 28900 },
          { code: "62.02", label: "Computeradviesbureaus", count: 5600 },
        ]
      },
    ]
  },
  {
    code: "M",
    label: "Vrije beroepen en wetenschappelijke activiteiten",
    count: 123450,
    children: [
      {
        code: "69",
        label: "Rechtskundige en boekhoudkundige dienstverlening",
        count: 45600,
        children: [
          { code: "69.10", label: "Rechtskundige dienstverlening", count: 23400 },
          { code: "69.20", label: "Accountants en belastingadviseurs", count: 22200 },
        ]
      },
    ]
  },
  {
    code: "Q",
    label: "Menselijke gezondheidszorg en maatschappelijke dienstverlening",
    count: 167890,
    children: [
      {
        code: "86",
        label: "Menselijke gezondheidszorg",
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
    label: "Overige diensten",
    count: 89450,
    children: [
      {
        code: "96",
        label: "Overige persoonlijke diensten",
        count: 56700,
        children: [
          { code: "96.02", label: "Haar- en schoonheidsverzorging", count: 34500 },
          { code: "96.04", label: "Sauna's, zonnebanken, fitnesscentra", count: 12300 },
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
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['I', '56']));
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
        const childrenMatch = children && children.some(c => !c.hidden);
        const selfMatches = nodeMatchesSearch(node, searchTerm, thematicCodes);

        return {
          ...node,
          children,
          hidden: !selfMatches && !childrenMatch,
          expanded: selfMatches || childrenMatch,
          thematicMatch: isThematicMatch(node, thematicCodes),
        };
      }).filter(n => !n.hidden);
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

  const toggleSelect = (code: string) => {
    setSelectedCodes(prev => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
        if (next.size >= 2) {
          setShowCTA(true);
        }
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

  const renderNode = (node: NaceNode & { hidden?: boolean; thematicMatch?: boolean }, level: number = 0) => {
    if (node.hidden) return null;

    const isExpanded = expandedNodes.has(node.code) || node.expanded;
    const isSelected = selectedCodes.has(node.code);
    const hasChildren = node.children && node.children.length > 0;
    const isThematic = node.thematicMatch;

    return (
      <div key={node.code}>
        <div
          className={`flex items-center gap-1.5 py-1 px-1.5 rounded transition-colors ${
            isThematic ? 'bg-amber-500/10' : ''
          } ${isSelected ? 'bg-blue-500/10' : ''} hover:bg-white/5`}
          style={{ paddingLeft: `${level * 16 + 4}px` }}
        >
          {/* Expand/Collapse */}
          {hasChildren ? (
            <button
              onClick={() => toggleExpand(node.code)}
              className="w-4 h-4 flex items-center justify-center text-zinc-500 hover:text-zinc-300"
            >
              <svg
                className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div className="w-4" />
          )}

          {/* Checkbox */}
          <button
            onClick={() => toggleSelect(node.code)}
            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
              isSelected
                ? 'bg-blue-500 border-blue-500'
                : 'border-zinc-500 hover:border-zinc-400'
            }`}
          >
            {isSelected && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Code */}
          <span className={`text-[11px] font-mono font-semibold ${isThematic ? 'text-amber-400' : 'text-blue-400'}`}>
            {node.code}
          </span>

          {/* Label */}
          <span className="text-[11px] text-zinc-300 flex-1 truncate">
            {node.label}
          </span>

          {/* Count */}
          <span className="text-[10px] text-zinc-500">
            ({node.count.toLocaleString('nl-BE')})
          </span>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderNode(child as NaceNode & { hidden?: boolean; thematicMatch?: boolean }, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-[#0f172a] overflow-hidden font-sans flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/5">
          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span className="text-xs font-semibold text-white">Branche (NACE-BEL 2025)</span>
          <span className="ml-auto text-[10px] text-zinc-500">Demo</span>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-white/10">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Zoek op code, naam of thema (bijv. horeca, bakker, advocaat)..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Thematic Match Indicator */}
          {hasThematicMatch && (
            <div className="mt-2 flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-md">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              <span className="text-[10px] text-amber-300">
                Thematisch zoeken actief: <strong className="text-amber-200">"{searchTerm}"</strong>
                <span className="text-amber-400/70 ml-1">→ {thematicCodes.join(', ')}</span>
              </span>
            </div>
          )}
        </div>

        {/* Tree Content */}
        <div className="flex-1 overflow-y-auto p-2 text-sm">
          {processedTree.length > 0 ? (
            processedTree.map(node => renderNode(node as NaceNode & { hidden?: boolean; thematicMatch?: boolean }))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500">
              <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-xs">Geen resultaten gevonden</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Selection Summary */}
      <div className="w-32 md:w-40 border-l border-white/10 bg-white/5 flex flex-col">
        <div className="p-2 border-b border-white/10">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Selectie</div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {selectedCodes.size === 0 ? (
            <div className="text-[10px] text-zinc-600 italic">Geen selectie</div>
          ) : (
            Array.from(selectedCodes).map(code => (
              <div
                key={code}
                className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 rounded text-[10px] text-blue-300"
              >
                <span className="font-mono">{code}</span>
                <button
                  onClick={() => toggleSelect(code)}
                  className="ml-auto text-blue-400 hover:text-blue-200"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Results Count */}
        <div className="p-3 border-t border-white/10 bg-white/5">
          <div className="text-[10px] text-zinc-500 mb-1">Resultaat</div>
          <div className="text-xl font-bold text-blue-400">
            {totalSelected.toLocaleString('nl-BE')}
          </div>
          <div className="text-[10px] text-zinc-500">bedrijven</div>
        </div>
      </div>

      {/* CTA Overlay */}
      {showCTA && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="bg-slate-800 rounded-xl p-6 mx-4 max-w-sm text-center border border-white/10 shadow-2xl">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {totalSelected.toLocaleString('nl-BE')} bedrijven geselecteerd
            </h3>
            <p className="text-sm text-zinc-400 mb-5">
              Dit is een demo. Wil je deze bedrijven exporteren naar CSV of Excel? Probeer de echte selectietool op Ad Hoc Data.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCTA(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-zinc-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                Verder testen
              </button>
              <a
                href="https://www.adhocdata.be/selecties-2026-justin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-1"
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

      {/* Feature Labels */}
      <div className="absolute top-2 left-2 z-5">
        <div className="px-2 py-1 bg-blue-600 text-white rounded-full text-[10px] font-semibold shadow-lg flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Thematisch Zoeken
        </div>
      </div>

      <div className="absolute top-2 right-2 z-5">
        <div className="px-2 py-1 bg-slate-700 text-white rounded text-[10px] font-bold shadow-lg">
          NACE 2025
        </div>
      </div>
    </div>
  );
}
