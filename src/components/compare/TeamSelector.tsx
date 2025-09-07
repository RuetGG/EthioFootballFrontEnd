'use client';

import { useState, useRef, useEffect } from 'react';
import type { TeamOption } from '../../types/compare';

interface TeamSelectorProps {
  value: string;
  onChange: (teamId: string) => void;
  placeholder: string;
  label: string;
  league: 'ETH' | 'EPL';
}

const ETHIOPIAN_TEAMS: TeamOption[] = [
  { value: '4110', label: 'Adama Kenema' },
  { value: '4111', label: 'Awassa Kenema' },
  { value: '4112', label: 'Bahardar' },
  { value: '4115', label: 'Dire Dawa Kenema' },
  { value: '4116', label: 'Ethiopia Bunna' },
  { value: '4117', label: 'Fasil Ketema' },
  { value: '4119', label: 'Kedus Giorgis' },
  { value: '4120', label: 'Mekelakeya' },
  { value: '4123', label: 'Sidama Bunna' },
  { value: '4124', label: 'Welayta Dicha' },
  { value: '4126', label: 'Arba Minch Kenema' },
  { value: '4127', label: 'Mebrat Hayl' },
  { value: '4129', label: 'Addis Ababa Ketema' },
  { value: '4130', label: 'Ethiopia Nigd Bank' },
  { value: '9983', label: 'Hadiya Hosaena' },
  { value: '9984', label: 'Jimma Aba Jifar' },
  { value: '9985', label: 'Sebeta Kenema' },
  { value: '9987', label: 'Wolkite Ketema' },
  { value: '20030', label: 'Ethiopian Medhin' },
  { value: '20031', label: 'Legetafo Legedadi' },
  { value: '22232', label: 'Hambericho Durame' },
  { value: '22233', label: 'Shashemene Kenema' },
];

const EPL_TEAMS: TeamOption[] = [
  { value: '33', label: 'Manchester United' },
  { value: '34', label: 'Newcastle' },
  { value: '35', label: 'Bournemouth' },
  { value: '36', label: 'Fulham' },
  { value: '39', label: 'Wolves' },
  { value: '40', label: 'Liverpool' },
  { value: '41', label: 'Southampton' },
  { value: '42', label: 'Arsenal' },
  { value: '45', label: 'Everton' },
  { value: '46', label: 'Leicester' },
  { value: '47', label: 'Tottenham' },
  { value: '48', label: 'West Ham' },
  { value: '49', label: 'Chelsea' },
  { value: '50', label: 'Manchester City' },
  { value: '51', label: 'Brighton' },
  { value: '52', label: 'Crystal Palace' },
  { value: '55', label: 'Brentford' },
  { value: '63', label: 'Leeds' },
  { value: '65', label: 'Nottingham Forest' },
  { value: '66', label: 'Aston Villa' },
  { value: '38', label: 'Watford' },
  { value: '44', label: 'Burnley' },
  { value: '71', label: 'Norwich' },
  { value: '62', label: 'Sheffield Utd' },
  { value: '1359', label: 'Luton' },
];

export default function TeamSelector({ value, onChange, placeholder, label, league }: TeamSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const availableTeams = league === 'ETH' ? ETHIOPIAN_TEAMS : EPL_TEAMS;
  const [filteredTeams, setFilteredTeams] = useState(availableTeams);
  
  const selectedTeam = availableTeams.find(team => team.value === value);

  useEffect(() => {
    const filtered = availableTeams.filter(team =>
      team.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchTerm, availableTeams]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTeamSelect = (team: TeamOption) => {
    onChange(team.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleInputClick = () => {
    setIsOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredTeams.length > 0) {
      handleTeamSelect(filteredTeams[0]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="relative">
        <div
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200"
          onClick={handleInputClick}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {selectedTeam ? (
                <>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-800">
                      {selectedTeam.label.split(' ').map(word => word[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <span className="text-gray-900 font-medium">{selectedTeam.label}</span>
                </>
              ) : (
                <span className="text-gray-500">{placeholder}</span>
              )}
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden">
            <div className="p-3 border-b border-gray-100">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              {filteredTeams.length > 0 ? (
                filteredTeams.map((team) => (
                  <div
                    key={team.value}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150 ${
                      value === team.value ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                    }`}
                    onClick={() => handleTeamSelect(team)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      value === team.value ? 'bg-blue-200' : 'bg-gray-100'
                    }`}>
                      <span className={`text-sm font-bold ${
                        value === team.value ? 'text-blue-800' : 'text-gray-600'
                        
                      }`}>
                        {team.label.split(' ').map(word => word[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <span className="font-medium">{team.label}</span>
                    {value === team.value && (
                      <svg className="w-5 h-5 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p>No teams found</p>
                  <p className="text-sm">Try adjusting your search</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
