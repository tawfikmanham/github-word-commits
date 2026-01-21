import { useEffect, useState } from 'react';

export default function App() {
  const [inputValue, setInputValue] = useState('GAME ON');
  const [committedText, setCommittedText] = useState('GAME ON');
  const [revealColumns, setRevealColumns] = useState<number | null>(null);
  const [revealToken, setRevealToken] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  // Letter patterns for "GAME ON" - each letter is 7 rows tall (full height), varying widths
  // Using 4 for bright, consistent green
  const letterPatterns: { [key: string]: number[][] } = {
    A: [
      [0, 4, 4, 4, 0],
      [0, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4]
    ],
    B: [
      [4, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 0]
    ],
    C: [
      [0, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 0, 0],
      [4, 4, 0, 0, 0],
      [4, 4, 0, 0, 0],
      [4, 4, 4, 4, 4],
      [0, 4, 4, 4, 4]
    ],
    D: [
      [4, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 0]
    ],
    E: [
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 0, 0],
      [4, 4, 4, 4, 0],
      [4, 4, 0, 0, 0],
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4]
    ],
    F: [
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 0, 0],
      [4, 4, 4, 4, 0],
      [4, 4, 0, 0, 0],
      [4, 4, 0, 0, 0],
      [4, 4, 0, 0, 0]
    ],
    G: [
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 0, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4]
    ],
    H: [
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4]
    ],
    I: [
      [4, 4, 4],
      [4, 4, 4],
      [4, 4, 4],
      [4, 4, 4],
      [4, 4, 4],
      [4, 4, 4],
      [4, 4, 4]
    ],
    J: [
      [0, 0, 4, 4],
      [0, 0, 4, 4],
      [0, 0, 4, 4],
      [0, 0, 4, 4],
      [4, 4, 4, 4],
      [4, 4, 4, 4],
      [4, 4, 4, 0]
    ],
    K: [
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 0],
      [4, 4, 4, 0, 0],
      [4, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4]
    ],
    L: [
      [4, 4, 0, 0, 0],
      [4, 4, 0, 0, 0],
      [4, 4, 0, 0, 0],
      [4, 4, 0, 0, 0],
      [4, 4, 0, 0, 0],
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4]
    ],
    M: [
      [4, 4, 0, 0, 0, 4, 4],
      [4, 4, 4, 0, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4],
      [4, 4, 0, 4, 0, 4, 4],
      [4, 4, 0, 0, 0, 4, 4],
      [4, 4, 0, 0, 0, 4, 4],
      [4, 4, 0, 0, 0, 4, 4]
    ],
    N: [
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4]
    ],
    O: [
      [0, 4, 4, 4, 0],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 4],
      [0, 4, 4, 4, 0]
    ],
    P: [
      [4, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 0],
      [4, 4, 0, 0, 0],
      [4, 4, 0, 0, 0],
      [4, 4, 0, 0, 0]
    ],
    Q: [
      [0, 4, 4, 4, 0],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 0],
      [4, 4, 4, 4, 4],
      [0, 0, 0, 4, 4]
    ],
    R: [
      [4, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 0],
      [4, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4]
    ],
    S: [
      [0, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 0, 0],
      [0, 4, 4, 4, 0],
      [0, 0, 0, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 0]
    ],
    T: [
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [0, 0, 4, 0, 0],
      [0, 0, 4, 0, 0],
      [0, 0, 4, 0, 0],
      [0, 0, 4, 0, 0],
      [0, 0, 4, 0, 0]
    ],
    U: [
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 4],
      [0, 4, 4, 4, 0]
    ],
    V: [
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [0, 4, 4, 4, 0],
      [0, 0, 4, 0, 0]
    ],
    W: [
      [4, 4, 0, 0, 0, 4, 4],
      [4, 4, 0, 0, 0, 4, 4],
      [4, 4, 0, 0, 0, 4, 4],
      [4, 4, 0, 4, 0, 4, 4],
      [4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 0, 4, 4, 4],
      [4, 4, 0, 0, 0, 4, 4]
    ],
    X: [
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [0, 4, 4, 4, 0],
      [0, 0, 4, 0, 0],
      [0, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4]
    ],
    Y: [
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [0, 4, 4, 4, 0],
      [0, 0, 4, 0, 0],
      [0, 0, 4, 0, 0],
      [0, 0, 4, 0, 0],
      [0, 0, 4, 0, 0]
    ],
    Z: [
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [0, 0, 0, 4, 4],
      [0, 0, 4, 4, 0],
      [4, 4, 0, 0, 0],
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4]
    ],
    ' ': [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    '0': [
      [0, 4, 4, 4, 0],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 4],
      [0, 4, 4, 4, 0]
    ],
    '1': [
      [0, 0, 4, 0, 0],
      [0, 4, 4, 0, 0],
      [4, 4, 4, 0, 0],
      [0, 4, 4, 0, 0],
      [0, 4, 4, 0, 0],
      [0, 4, 4, 0, 0],
      [4, 4, 4, 4, 4]
    ],
    '2': [
      [0, 4, 4, 4, 0],
      [4, 4, 4, 4, 4],
      [0, 0, 0, 4, 4],
      [0, 4, 4, 4, 0],
      [4, 4, 0, 0, 0],
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4]
    ],
    '3': [
      [4, 4, 4, 4, 0],
      [0, 0, 0, 4, 4],
      [0, 0, 0, 4, 4],
      [0, 4, 4, 4, 0],
      [0, 0, 0, 4, 4],
      [0, 0, 0, 4, 4],
      [4, 4, 4, 4, 0]
    ],
    '4': [
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 4],
      [0, 0, 0, 4, 4],
      [0, 0, 0, 4, 4],
      [0, 0, 0, 4, 4]
    ],
    '5': [
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 0, 0],
      [4, 4, 4, 4, 0],
      [0, 0, 0, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 0]
    ],
    '6': [
      [0, 4, 4, 4, 0],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 0, 0],
      [4, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 4],
      [0, 4, 4, 4, 0]
    ],
    '7': [
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [0, 0, 0, 4, 4],
      [0, 0, 4, 4, 0],
      [0, 0, 4, 4, 0],
      [0, 4, 4, 0, 0],
      [0, 4, 4, 0, 0]
    ],
    '8': [
      [0, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [0, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [0, 4, 4, 4, 0]
    ],
    '9': [
      [0, 4, 4, 4, 0],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 4, 4],
      [0, 4, 4, 4, 4],
      [0, 0, 0, 4, 4],
      [4, 4, 4, 4, 4],
      [0, 4, 4, 4, 0]
    ],
    '!': [
      [4, 4],
      [4, 4],
      [4, 4],
      [4, 4],
      [4, 4],
      [0, 0],
      [4, 4]
    ],
    '?': [
      [0, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [0, 0, 0, 4, 4],
      [0, 0, 4, 4, 0],
      [0, 0, 4, 4, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 4, 4, 0]
    ],
    '.': [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [4, 4],
      [4, 4]
    ],
    ',': [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [4, 4],
      [4, 4],
      [4, 0]
    ],
    '-': [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [4, 4, 4],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    '_': [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [4, 4, 4]
    ],
    '+': [
      [0, 0, 0],
      [0, 4, 0],
      [0, 4, 0],
      [4, 4, 4],
      [0, 4, 0],
      [0, 4, 0],
      [0, 0, 0]
    ],
    '=': [
      [0, 0, 0],
      [0, 0, 0],
      [4, 4, 4],
      [0, 0, 0],
      [4, 4, 4],
      [0, 0, 0],
      [0, 0, 0]
    ],
    '*': [
      [4, 0, 4],
      [0, 4, 0],
      [4, 4, 4],
      [0, 4, 0],
      [4, 0, 4],
      [0, 0, 0],
      [0, 0, 0]
    ],
    '#': [
      [0, 4, 0, 4, 0],
      [4, 4, 4, 4, 4],
      [0, 4, 0, 4, 0],
      [0, 4, 0, 4, 0],
      [4, 4, 4, 4, 4],
      [0, 4, 0, 4, 0],
      [0, 0, 0, 0, 0]
    ],
    '@': [
      [0, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 0, 0, 0],
      [4, 4, 4, 4, 4],
      [0, 4, 4, 4, 0]
    ],
    '&': [
      [0, 4, 4, 0, 0],
      [4, 4, 0, 4, 0],
      [0, 4, 4, 0, 0],
      [4, 4, 4, 4, 0],
      [4, 4, 0, 4, 4],
      [4, 4, 0, 4, 4],
      [0, 4, 4, 0, 4]
    ],
    '$': [
      [0, 0, 4, 0, 0],
      [0, 4, 4, 4, 4],
      [4, 4, 4, 0, 0],
      [0, 4, 4, 4, 0],
      [0, 0, 4, 4, 4],
      [4, 4, 4, 4, 0],
      [0, 0, 4, 0, 0]
    ],
    '%': [
      [4, 4, 0, 0, 4],
      [4, 4, 0, 4, 4],
      [0, 0, 4, 4, 0],
      [0, 4, 4, 0, 0],
      [0, 4, 4, 0, 0],
      [4, 4, 0, 4, 4],
      [4, 0, 0, 4, 4]
    ],
    '(': [
      [0, 4],
      [4, 4],
      [4, 0],
      [4, 0],
      [4, 0],
      [4, 4],
      [0, 4]
    ],
    ')': [
      [4, 0],
      [4, 4],
      [0, 4],
      [0, 4],
      [0, 4],
      [4, 4],
      [4, 0]
    ],
    '[': [
      [4, 4],
      [4, 0],
      [4, 0],
      [4, 0],
      [4, 0],
      [4, 0],
      [4, 4]
    ],
    ']': [
      [4, 4],
      [0, 4],
      [0, 4],
      [0, 4],
      [0, 4],
      [0, 4],
      [4, 4]
    ],
    '/': [
      [0, 0, 4],
      [0, 0, 4],
      [0, 4, 4],
      [0, 4, 0],
      [4, 4, 0],
      [4, 0, 0],
      [4, 0, 0]
    ],
    ':': [
      [0],
      [4],
      [4],
      [0],
      [4],
      [4],
      [0]
    ],
    ';': [
      [0],
      [4],
      [4],
      [0],
      [4],
      [4],
      [4]
    ],
    '<': [
      [0, 0, 4],
      [0, 4, 0],
      [4, 0, 0],
      [4, 0, 0],
      [0, 4, 0],
      [0, 0, 4],
      [0, 0, 0]
    ],
    '>': [
      [4, 0, 0],
      [0, 4, 0],
      [0, 0, 4],
      [0, 0, 4],
      [0, 4, 0],
      [4, 0, 0],
      [0, 0, 0]
    ],
    '\'': [
      [4],
      [4],
      [4],
      [0],
      [0],
      [0],
      [0]
    ],
    '"': [
      [4, 0, 4],
      [4, 0, 4],
      [4, 0, 4],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  };

  const letterSpacing = 2;

  const getWordWidth = (word: string) => {
    return word.split("").reduce((sum, ch, idx) => {
      const pattern = letterPatterns[ch];
      if (!pattern) {
        return sum;
      }
      const letterWidth = pattern[0]?.length ?? 0;
      const spacing = idx === word.length - 1 ? 0 : letterSpacing;
      return sum + letterWidth + spacing;
    }, 0);
  };

  useEffect(() => {
    if (revealToken === 0) {
      return;
    }

    const totalColumns = getWordWidth(committedText);
    if (totalColumns === 0) {
      setRevealColumns(null);
      return;
    }

    let current = 0;
    setRevealColumns(0);

    const interval = setInterval(() => {
      current += 1;
      setRevealColumns(current);
      if (current >= totalColumns) {
        setRevealColumns(null);
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [committedText, revealToken]);

  const wordWidth = getWordWidth(committedText);
  const wordStartWeek = Math.max(0, Math.floor((53 - wordWidth) / 2));
  const wordEndWeek = Math.min(53, wordStartWeek + wordWidth);

  // Generate contribution data for 53 weeks (7 days per week)
  const generateContributionData = () => {
    const data: number[][] = [];
    let totalContributions = 0;
    
    // Initialize with all zeros
    for (let week = 0; week < 53; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        weekData.push(0);
      }
      data.push(weekData);
    }
    
    // Center the word pattern within the 53-week grid
    const word = committedText;
    let currentWeek = wordStartWeek;
    let wordColumnIndex = 0;
    
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      const pattern = letterPatterns[letter];
      
      if (pattern) {
        // Place each column of the letter
        for (let col = 0; col < pattern[0].length; col++) {
          const columnRevealed = revealColumns === null || wordColumnIndex < revealColumns;
          for (let row = 0; row < pattern.length; row++) {
            const value = pattern[row][col];
            if (currentWeek < 53 && row < 7 && columnRevealed) {
              if (value > 0) {
                // Use varying shades of green for visual interest
                const shades = [2, 3, 3, 4, 4, 4]; // Mostly bright, some medium
                const randomShade = shades[Math.floor(Math.random() * shades.length)];
                data[currentWeek][row] = randomShade;
                totalContributions++;
              } else {
                data[currentWeek][row] = 0;
              }
            }
          }
          currentWeek++;
          wordColumnIndex++;
        }
        // Add spacing between letters (2 columns)
        currentWeek += letterSpacing;
        wordColumnIndex += letterSpacing;
      }
    }
    
    // Add minimal random contributions throughout the rest of the year
    for (let week = 0; week < 53; week++) {
      for (let day = 0; day < 7; day++) {
        if (week >= wordStartWeek && week < wordEndWeek) {
          continue;
        }
        if (data[week][day] === 0 && Math.random() < 0.02) {
          const level = Math.floor(Math.random() * 3) + 1;
          data[week][day] = level;
          totalContributions++;
        }
      }
    }
    
    return { data, totalContributions };
  };

  const { data: contributions, totalContributions } = generateContributionData();
  
  // Months for the header
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Mon', 'Wed', 'Fri'];

  // Calculate which week each month starts (approximately)
  const getMonthPositions = () => {
    const positions = [];
    for (let i = 0; i < 12; i++) {
      positions.push(Math.floor((i * 52) / 12));
    }
    return positions;
  };

  const monthPositions = getMonthPositions();

  const getContributionColor = (level: number) => {
    if (level === 0) return 'bg-[#161b22]';
    if (level === 1) return 'bg-[#0e4429]';
    if (level === 2) return 'bg-[#006d32]';
    if (level === 3) return 'bg-[#26a641]';
    return 'bg-[#39d353]';
  };

  return (
    <div className="size-full flex items-center justify-center bg-[#0d1117] p-8 relative">
      <div className="w-fit">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white font-normal">
            {totalContributions} contributions in 2026
          </h1>
          <div className="relative">
            <button 
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-[#7d8590] text-xs hover:text-white transition-colors flex items-center gap-1 ml-4"
            >
              Contribution settings
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
              </svg>
            </button>
            {showTooltip && (
              <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-[#1c2128] border border-[#30363d] rounded-md shadow-lg whitespace-nowrap z-10">
                <p className="text-[#7d8590] text-xs">This is just for fun</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] w-fit">
          <div className="relative">
            {/* Month labels */}
            <div className="flex mb-2 ml-[60px]">
              {months.map((month, idx) => (
                <div
                  key={month}
                  className="text-[#7d8590] text-xs"
                  style={{
                    position: 'absolute',
                    left: `${60 + monthPositions[idx] * 13}px`
                  }}
                >
                  {month}
                </div>
              ))}
            </div>

            {/* Graph grid */}
            <div className="flex mt-8">
              {/* Day labels */}
              <div className="flex flex-col justify-between pr-2 text-[#7d8590] text-xs mr-2">
                <div style={{ height: '11px' }}>{days[0]}</div>
                <div style={{ height: '11px' }}>{days[1]}</div>
                <div style={{ height: '11px' }}>{days[2]}</div>
              </div>

              {/* Contribution squares */}
              <div className="flex gap-[3px]">
                {contributions.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[3px]">
                    {week.map((level, dayIdx) => {
                      const columnInWord = weekIdx - wordStartWeek;
                      const isRevealColumn =
                        revealColumns !== null && columnInWord === revealColumns - 1;
                      const shouldGlow = isRevealColumn && level > 0;

                      return (
                        <div
                          key={`${weekIdx}-${dayIdx}`}
                          className={`w-[11px] h-[11px] rounded-[2px] ${getContributionColor(level)} border border-[#1c2128] ${shouldGlow ? 'glow-ripple' : ''}`}
                          title={`${level} contributions`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer with legend */}
          <div className="mt-4 flex items-center justify-between text-xs ml-[60px]">
            <a href="#" className="text-[#7d8590] hover:text-[#58a6ff] transition-colors">
              Learn how we count contributions
            </a>
            <div className="flex items-center gap-1">
              <span className="text-[#7d8590]">Less</span>
              <div className="flex gap-[3px] ml-2">
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#161b22] border border-[#1c2128]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0e4429] border border-[#1c2128]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#006d32] border border-[#1c2128]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#26a641] border border-[#1c2128]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#39d353] border border-[#1c2128]" />
              </div>
              <span className="text-[#7d8590] ml-1">More</span>
            </div>
          </div>
        </div>

        {/* Input field for custom text */}
        <div className="mt-6 flex flex-col gap-2">
          <label htmlFor="custom-text" className="text-[#7d8590] text-sm">
            Enter your custom text (A-Z, 0-9, symbols, and spaces supported):
          </label>
          <div className="relative">
            <input
              id="custom-text"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                // Ensure Cmd+A / Ctrl+A works for select all
                if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
                  // Allow default behavior
                  return;
                }
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setCommittedText(inputValue);
                  setRevealToken((prev) => prev + 1);
                }
              }}
              placeholder="Type your message..."
              className="w-full px-4 py-2 pr-10 bg-[#0d1117] border border-[#30363d] rounded-md text-white placeholder:text-[#7d8590] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-colors"
            />
            {inputValue && (
              <button
                onClick={() => {
                  setInputValue('');
                  setCommittedText('');
                  setRevealColumns(null);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7d8590] hover:text-white transition-colors p-1"
                title="Clear text"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-[#7d8590] text-xs">
            Tip: Keep it short (under 8-10 characters) to fit within the graph width
          </p>
        </div>

        {/* Footer */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2">
          <a 
            href="https://linkedin.com/in/tawfikmanham" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#7d8590] hover:text-[#58a6ff] transition-colors"
            style={{ fontSize: '10px' }}
          >
            tawfik manham © 2026
          </a>
        </div>
      </div>
    </div>
  );
}
