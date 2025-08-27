import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Users, Edit3, Play, Star, Share2, Camera, Shuffle, Save, X, Plus } from 'lucide-react';

const PaniPuriTournament = () => {
  const [participants, setParticipants] = useState([]);
  const [participantInput, setParticipantInput] = useState('Sahil\nKavi\nSamruddhi\nSmita\nNisha\nJaya\nShrutika\nSarita\nNilesh\nKunal\nBunty\nYash\nSpecial Guest');
  const [tournament, setTournament] = useState(null);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [matchTimer, setMatchTimer] = useState(120); // 2 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [editingMatchups, setEditingMatchups] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [winner, setWinner] = useState(null);
  const [specialMatches, setSpecialMatches] = useState([]);
  const [showSpecialMatch, setShowSpecialMatch] = useState(false);

  // Initialize with sample data
  useEffect(() => {
    const names = participantInput.split('\n').filter(name => name.trim());
    setParticipants(names.slice(0, 20));
  }, []);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && matchTimer > 0) {
      interval = setInterval(() => {
        setMatchTimer(timer => timer - 1);
      }, 1000);
    } else if (matchTimer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, matchTimer]);

  const createCustomTournament = () => {
    if (participants.length < 2) return;
    
    // Check if using sample names for custom tournament
    const sampleNames = ['Sahil', 'Kavi', 'Samruddhi', 'Smita', 'Nisha', 'Jaya', 'Shrutika', 'Sarita', 'Nilesh', 'Kunal', 'Bunty', 'Yash', 'Special Guest'];
    const hasAllSampleNames = sampleNames.every(name => participants.includes(name));
    
    if (hasAllSampleNames) {
      // Create your exact custom matchups
      const firstRound = [
        {
          id: 'match-1-0',
          player1: 'Sahil',
          player2: 'Kavi',
          winner: null,
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        },
        {
          id: 'match-1-1',
          player1: 'Samruddhi',
          player2: 'Smita',
          winner: null,
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        },
        {
          id: 'match-1-2',
          player1: 'Nisha',
          player2: 'Jaya',
          winner: null,
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        },
        {
          id: 'match-1-3',
          player1: 'Shrutika',
          player2: 'Sarita',
          winner: null,
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        },
        {
          id: 'match-1-4',
          player1: 'Nilesh',
          player2: 'Kunal',
          winner: null,
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        },
        {
          id: 'match-1-5',
          player1: 'Bunty',
          player2: 'Yash',
          winner: null,
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        },
        {
          id: 'bye-1-0',
          player1: 'Special Guest',
          player2: 'BYE',
          winner: 'Special Guest',
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        }
      ];
      
      // Create subsequent rounds
      const secondRound = [
        {
          id: 'match-2-0',
          player1: null, // Winner from M1
          player2: null, // Winner from M5/M6 (random)
          winner: null,
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        },
        {
          id: 'match-2-1',
          player1: null, // Winner from M2
          player2: null, // Winner from M3
          winner: null,
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        },
        {
          id: 'match-2-2',
          player1: null, // Winner from M4
          player2: null, // Winner from M5/M6 (random) or Special Guest
          winner: null,
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        }
      ];

      const semiFinal = [
        {
          id: 'match-3-0',
          player1: null,
          player2: null,
          winner: null,
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        },
        {
          id: 'match-3-1',
          player1: null,
          player2: null, // Second chance player
          winner: null,
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        }
      ];

      const final = [{
        id: 'final',
        player1: null,
        player2: null,
        winner: null,
        player1Score: { puris: 0, time: 0 },
        player2Score: { puris: 0, time: 0 }
      }];

      const rounds = [firstRound, secondRound, semiFinal, final];
      setTournament({ rounds, currentRound: 0 });
      
    } else {
      // For custom names, create random tournament
      createTournament();
    }
    
    // Add special match
    setSpecialMatches([{
      id: 'special-ajji',
      player1: 'Kunal Ajji',
      player2: 'Sahil Ajji',
      winner: null,
      player1Score: { puris: 0, time: 0 },
      player2Score: { puris: 0, time: 0 },
      isSpecial: true
    }]);

    updateLeaderboard();
  };

  const createTournament = () => {
    if (participants.length < 2 || participants.length > 20) return;
    
    // Create first round matchups using actual participants
    const firstRound = [];
    const playerPool = [...participants];
    
    // Create matches by pairing participants
    for (let i = 0; i < playerPool.length; i += 2) {
      if (i + 1 < playerPool.length) {
        firstRound.push({
          id: `match-1-${Math.floor(i/2)}`,
          player1: playerPool[i],
          player2: playerPool[i + 1],
          winner: null,
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        });
      } else {
        // Handle odd number with bye
        firstRound.push({
          id: `bye-1-0`,
          player1: playerPool[i],
          player2: 'BYE',
          winner: playerPool[i],
          player1Score: { puris: 0, time: 0 },
          player2Score: { puris: 0, time: 0 }
        });
      }
    }

    // Create second round with custom structure
    const secondRound = [
      {
        id: 'match-2-0',
        player1: null, // Winner from M1
        player2: null, // Winner from M5/M6 (random)
        winner: null,
        player1Score: { puris: 0, time: 0 },
        player2Score: { puris: 0, time: 0 }
      },
      {
        id: 'match-2-1',
        player1: null, // Winner from M2
        player2: null, // Winner from M3
        winner: null,
        player1Score: { puris: 0, time: 0 },
        player2Score: { puris: 0, time: 0 }
      },
      {
        id: 'match-2-2',
        player1: null, // Winner from M4
        player2: null, // Winner from M5/M6 (random) or Special Guest
        winner: null,
        player1Score: { puris: 0, time: 0 },
        player2Score: { puris: 0, time: 0 }
      }
    ];

    // Create semifinals
    const semiFinal = [
      {
        id: 'match-3-0',
        player1: null,
        player2: null,
        winner: null,
        player1Score: { puris: 0, time: 0 },
        player2Score: { puris: 0, time: 0 }
      },
      {
        id: 'match-3-1',
        player1: null,
        player2: null,
        winner: null,
        player1Score: { puris: 0, time: 0 },
        player2Score: { puris: 0, time: 0 }
      }
    ];

    // Create final
    const final = [{
      id: 'final',
      player1: null,
      player2: null,
      winner: null,
      player1Score: { puris: 0, time: 0 },
      player2Score: { puris: 0, time: 0 }
    }];

    const rounds = [firstRound, secondRound, semiFinal, final];

    // Add special match
    setSpecialMatches([{
      id: 'special-ajji',
      player1: 'Kunal Ajji',
      player2: 'Sahil Ajji',
      winner: null,
      player1Score: { puris: 0, time: 0 },
      player2Score: { puris: 0, time: 0 },
      isSpecial: true
    }]);

    setTournament({ rounds, currentRound: 0 });
    updateLeaderboard();
  };

  const customAdvancement = (match, winner) => {
    const newTournament = { ...tournament };
    const roundIndex = tournament.rounds.findIndex(round => 
      round.some(m => m.id === match.id)
    );
    
    if (roundIndex === 0) {
      // First round custom advancement logic
      if (match.id === 'match-1-0') {
        // M1 winner goes to quarter-final 1
        newTournament.rounds[1][0].player1 = winner;
      } else if (match.id === 'match-1-1') {
        // M2 winner goes to quarter-final 2
        newTournament.rounds[1][1].player1 = winner;
      } else if (match.id === 'match-1-2') {
        // M3 winner goes to quarter-final 2
        newTournament.rounds[1][1].player2 = winner;
      } else if (match.id === 'match-1-3') {
        // M4 winner goes to quarter-final 3
        newTournament.rounds[1][2].player1 = winner;
      } else if (match.id === 'match-1-4' || match.id === 'match-1-5') {
        // M5/M6 winners - randomly assign to available slots in QF1 and QF3
        const availableSlots = [];
        if (!newTournament.rounds[1][0].player2) availableSlots.push([1, 0, 'player2']);
        if (!newTournament.rounds[1][2].player2) availableSlots.push([1, 2, 'player2']);
        
        if (availableSlots.length > 0) {
          const randomSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
          newTournament.rounds[randomSlot[0]][randomSlot[1]][randomSlot[2]] = winner;
        }
      }
    } else if (roundIndex === 1) {
      // Quarter-finals to semifinals with special rule
      const matchIndex = tournament.rounds[roundIndex].findIndex(m => m.id === match.id);
      if (matchIndex === 0) {
        // QF1 winner goes to SF1
        newTournament.rounds[2][0].player1 = winner;
      } else if (matchIndex === 1) {
        // QF2 winner goes to SF1
        newTournament.rounds[2][0].player2 = winner;
      } else if (matchIndex === 2) {
        // QF3 winner goes to SF2
        newTournament.rounds[2][1].player1 = winner;
      }
      
      // Check if all quarter-finals are complete
      const allQFComplete = newTournament.rounds[1].every(m => m.winner);
      if (allQFComplete) {
        // Find player with highest puri count for second chance
        const qfPlayers = [];
        newTournament.rounds[1].forEach(qfMatch => {
          if (qfMatch.player1 && qfMatch.player1 !== 'BYE') {
            qfPlayers.push({
              name: qfMatch.player1,
              puris: qfMatch.player1Score.puris,
              won: qfMatch.winner === qfMatch.player1
            });
          }
          if (qfMatch.player2 && qfMatch.player2 !== 'BYE') {
            qfPlayers.push({
              name: qfMatch.player2,
              puris: qfMatch.player2Score.puris,
              won: qfMatch.winner === qfMatch.player2
            });
          }
        });
        
        // Find highest puri scorer who didn't win their QF
        const losers = qfPlayers.filter(p => !p.won);
        if (losers.length > 0) {
          const highestPuriLoser = losers.reduce((max, player) => 
            player.puris > max.puris ? player : max
          );
          
          // Give them second chance in SF2
          if (!newTournament.rounds[2][1].player2) {
            newTournament.rounds[2][1].player2 = highestPuriLoser.name;
          }
        }
      }
    } else if (roundIndex === 2) {
      // Semifinals to final with special rule
      const matchIndex = tournament.rounds[roundIndex].findIndex(m => m.id === match.id);
      if (matchIndex === 0) {
        // SF1 winner goes to final
        newTournament.rounds[3][0].player1 = winner;
        
        // SF1 loser gets second chance in SF2 if it's not filled
        const loser = match.player1 === winner ? match.player2 : match.player1;
        if (!newTournament.rounds[2][1].player2 && loser) {
          newTournament.rounds[2][1].player2 = loser;
        }
      } else if (matchIndex === 1) {
        // SF2 winner goes to final
        newTournament.rounds[3][0].player2 = winner;
      }
    }
    
    return newTournament;
  };

  const recordMatch = (match, winner, player1Score, player2Score) => {
    if (match.isSpecial) {
      // Handle special match
      const newSpecialMatches = [...specialMatches];
      const matchIndex = newSpecialMatches.findIndex(m => m.id === match.id);
      newSpecialMatches[matchIndex].winner = winner;
      newSpecialMatches[matchIndex].player1Score = player1Score;
      newSpecialMatches[matchIndex].player2Score = player2Score;
      setSpecialMatches(newSpecialMatches);
      setCurrentMatch(null);
      return;
    }

    const newTournament = customAdvancement(match, winner);
    const roundIndex = tournament.rounds.findIndex(round => 
      round.some(m => m.id === match.id)
    );
    const matchIndex = tournament.rounds[roundIndex].findIndex(m => m.id === match.id);
    
    newTournament.rounds[roundIndex][matchIndex].winner = winner;
    newTournament.rounds[roundIndex][matchIndex].player1Score = player1Score;
    newTournament.rounds[roundIndex][matchIndex].player2Score = player2Score;
    
    if (match.id === 'final') {
      setWinner(winner);
    }
    
    setTournament(newTournament);
    setCurrentMatch(null);
    updateLeaderboard();
  };

  const updateLeaderboard = () => {
    if (!tournament) return;
    
    const playerStats = {};
    
    tournament.rounds.forEach(round => {
      round.forEach(match => {
        // Only count matches that have been played (have scores recorded)
        const matchPlayed = match.player1Score.puris > 0 || match.player1Score.time > 0 || 
                           match.player2Score.puris > 0 || match.player2Score.time > 0 || 
                           match.winner;

        if (match.player1 && match.player1 !== 'BYE') {
          if (!playerStats[match.player1]) {
            playerStats[match.player1] = { totalPuris: 0, totalTime: 0, wins: 0, matchesPlayed: 0 };
          }
          if (matchPlayed) {
            playerStats[match.player1].totalPuris += match.player1Score.puris;
            playerStats[match.player1].totalTime += match.player1Score.time;
            playerStats[match.player1].matchesPlayed += 1;
            if (match.winner === match.player1) {
              playerStats[match.player1].wins += 1;
            }
          }
        }
        
        if (match.player2 && match.player2 !== 'BYE') {
          if (!playerStats[match.player2]) {
            playerStats[match.player2] = { totalPuris: 0, totalTime: 0, wins: 0, matchesPlayed: 0 };
          }
          if (matchPlayed) {
            playerStats[match.player2].totalPuris += match.player2Score.puris;
            playerStats[match.player2].totalTime += match.player2Score.time;
            playerStats[match.player2].matchesPlayed += 1;
            if (match.winner === match.player2) {
              playerStats[match.player2].wins += 1;
            }
          }
        }
      });
    });
    
    const sortedStats = Object.entries(playerStats)
      .map(([name, stats]) => ({ 
        name, 
        ...stats,
        avgPuris: stats.matchesPlayed > 0 ? (stats.totalPuris / stats.matchesPlayed).toFixed(1) : 0
      }))
      .sort((a, b) => b.totalPuris - a.totalPuris);
    
    setLeaderboard(sortedStats);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (duration = 120) => {
    setMatchTimer(duration);
    setIsTimerRunning(true);
  };

  const MatchModal = ({ match, onClose, onRecord }) => {
    const [p1Puris, setP1Puris] = useState(0);
    const [p1Time, setP1Time] = useState(0);
    const [p2Puris, setP2Puris] = useState(0);
    const [p2Time, setP2Time] = useState(0);
    const [selectedWinner, setSelectedWinner] = useState('');
    const [localTimer, setLocalTimer] = useState(120);
    const [localTimerRunning, setLocalTimerRunning] = useState(false);

    // Local timer effect for this match only
    useEffect(() => {
      let interval = null;
      if (localTimerRunning && localTimer > 0) {
        interval = setInterval(() => {
          setLocalTimer(timer => timer - 1);
        }, 1000);
      } else if (localTimer === 0) {
        setLocalTimerRunning(false);
      }
      return () => clearInterval(interval);
    }, [localTimerRunning, localTimer]);

    const startLocalTimer = (duration = 120) => {
      setLocalTimer(duration);
      setLocalTimerRunning(true);
      // Stop the global timer
      setIsTimerRunning(false);
    };

    const stopLocalTimer = () => {
      setLocalTimerRunning(false);
    };

    const handleSubmit = () => {
      if (!selectedWinner) return;
      stopLocalTimer();
      onRecord(
        match,
        selectedWinner,
        { puris: p1Puris, time: p1Time },
        { puris: p2Puris, time: p2Time }
      );
    };

    const handleClose = () => {
      stopLocalTimer();
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl p-8 w-full max-w-lg shadow-2xl border-2 border-orange-200">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🥟</div>
            <h3 className="text-2xl font-bold text-orange-600">
              {match.isSpecial ? 'Special Match!' : 'Record Match Result'}
            </h3>
            <div className="flex justify-center gap-4 mt-4">
              {localTimerRunning && (
                <div className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold flex items-center gap-2 border-2 border-red-200">
                  <Clock size={16} />
                  {formatTime(localTimer)}
                </div>
              )}
            </div>
            <div className="flex justify-center gap-2 mt-2">
              <button
                onClick={() => startLocalTimer(60)}
                disabled={localTimerRunning}
                className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm flex items-center gap-1 hover:bg-orange-200 disabled:opacity-50"
              >
                <Clock size={14} />
                1 min
              </button>
              <button
                onClick={() => startLocalTimer(120)}
                disabled={localTimerRunning}
                className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-orange-600 disabled:opacity-50"
              >
                <Clock size={14} />
                2 min
              </button>
              <button
                onClick={() => startLocalTimer(180)}
                disabled={localTimerRunning}
                className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm flex items-center gap-1 hover:bg-orange-200 disabled:opacity-50"
              >
                <Clock size={14} />
                3 min
              </button>
              {localTimerRunning && (
                <button
                  onClick={stopLocalTimer}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-red-600"
                >
                  Stop
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-5 rounded-2xl border border-orange-200">
              <h4 className="font-bold text-orange-700 mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                {match.player1}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-orange-600 font-medium">Puris Eaten</label>
                  <input
                    type="number"
                    value={p1Puris}
                    onChange={(e) => setP1Puris(parseInt(e.target.value) || 0)}
                    className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-orange-600 font-medium">Time (sec)</label>
                  <input
                    type="number"
                    value={p1Time}
                    onChange={(e) => setP1Time(parseInt(e.target.value) || 0)}
                    className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {match.player2 !== 'BYE' && (
              <div className="bg-gradient-to-r from-yellow-100 to-red-100 p-5 rounded-2xl border border-yellow-200">
                <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  {match.player2}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-red-600 font-medium">Puris Eaten</label>
                    <input
                      type="number"
                      value={p2Puris}
                      onChange={(e) => setP2Puris(parseInt(e.target.value) || 0)}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-red-600 font-medium">Time (sec)</label>
                    <input
                      type="number"
                      value={p2Time}
                      onChange={(e) => setP2Time(parseInt(e.target.value) || 0)}
                      className="w-full p-3 border-2 border-red-200 rounded-lg focus:border-red-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="bg-green-50 p-5 rounded-2xl border border-green-200">
              <label className="block font-bold text-green-700 mb-3">🏆 Winner:</label>
              <select
                value={selectedWinner}
                onChange={(e) => setSelectedWinner(e.target.value)}
                className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-400 focus:outline-none text-lg font-medium"
              >
                <option value="">Select Winner</option>
                <option value={match.player1}>{match.player1}</option>
                {match.player2 !== 'BYE' && (
                  <option value={match.player2}>{match.player2}</option>
                )}
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleClose}
                className="flex-1 py-4 px-6 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <X size={20} />
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedWinner}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Trophy size={20} />
                Record Win
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BracketView = () => {
    if (!tournament) return null;

    const getRoundName = (roundIndex) => {
      const totalRounds = tournament.rounds.length;
      if (roundIndex === totalRounds - 1) return 'Final';
      if (roundIndex === totalRounds - 2) return 'Semi-Final (Second Chance Round)';
      if (roundIndex === totalRounds - 3) return 'Quarter-Final';
      return `Round ${roundIndex + 1}`;
    };

    return (
      <div className="space-y-12">
        {tournament.rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-2">
                {getRoundName(roundIndex)}
              </h3>
              {roundIndex === tournament.rounds.length - 2 && (
                <div className="text-sm text-purple-600 font-medium mb-2">
                  🔄 Special Rule: Highest puri scorer from QF gets second chance + SF1 loser competes again
                </div>
              )}
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded mx-auto"></div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {round.map((match, matchIndex) => (
                <div
                  key={match.id}
                  className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    match.winner
                      ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300 shadow-lg'
                      : 'bg-gradient-to-br from-white to-orange-50 border-orange-200 hover:border-orange-300 shadow-md'
                  }`}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400"></div>
                  <div className="p-6 space-y-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Match {matchIndex + 1}
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-xl transition-colors ${
                      match.winner === match.player1 
                        ? 'bg-gradient-to-r from-green-100 to-green-200 border border-green-300' 
                        : 'bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-lg">{match.player1 || 'TBD'}</div>
                        {match.winner === match.player1 && (
                          <Trophy className="text-green-600" size={20} />
                        )}
                      </div>
                      {match.player1Score.puris > 0 && (
                        <div className="text-sm text-gray-600 mt-1">
                          🥟 {match.player1Score.puris} puris • ⏱️ {formatTime(match.player1Score.time)}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center font-bold text-orange-500 text-xl">VS</div>
                    
                    {match.player2 !== 'BYE' ? (
                      <div className={`p-4 rounded-xl transition-colors ${
                        match.winner === match.player2 
                          ? 'bg-gradient-to-r from-green-100 to-green-200 border border-green-300' 
                          : 'bg-gradient-to-r from-red-100 to-pink-100 border border-red-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-lg">{match.player2 || 'TBD'}</div>
                          {match.winner === match.player2 && (
                            <Trophy className="text-green-600" size={20} />
                          )}
                        </div>
                        {match.player2Score.puris > 0 && (
                          <div className="text-sm text-gray-600 mt-1">
                            🥟 {match.player2Score.puris} puris • ⏱️ {formatTime(match.player2Score.time)}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-gray-100 border border-gray-200 text-center text-gray-500 font-medium">
                        🎫 BYE - Auto Advance
                      </div>
                    )}
                    
                    {match.player1 && match.player2 && !match.winner && (
                      <button
                        onClick={() => setCurrentMatch(match)}
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Play size={18} />
                        Start Battle!
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (winner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>
            <div className="text-8xl mb-6 animate-bounce">🏆</div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-4">
              Champion!
            </h1>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">{winner}</h2>
            <div className="text-2xl text-gray-600 mb-8">
              Pani Puri Challenge Winner! 🎉
            </div>
            
            {leaderboard.length > 0 && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 mb-8 border border-orange-200">
                <h3 className="text-2xl font-bold text-orange-600 mb-6 flex items-center justify-center gap-2">
                  <Star className="text-yellow-500" />
                  Final Leaderboard
                </h3>
                <div className="grid gap-4">
                  {leaderboard.slice(0, 5).map((player, index) => (
                    <div key={player.name} className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300' :
                      index === 1 ? 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300' :
                      index === 2 ? 'bg-gradient-to-r from-orange-100 to-red-100 border-orange-300' :
                      'bg-white border-gray-200'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-500 text-white' :
                          index === 2 ? 'bg-orange-500 text-white' :
                          'bg-gray-300 text-gray-700'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-bold text-lg">{player.name}</div>
                          <div className="text-sm text-gray-500">{player.wins} wins • Avg: {player.avgPuris} puris/match</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl">{player.totalPuris}</div>
                        <div className="text-sm text-gray-500">total puris</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setWinner(null);
                  setTournament(null);
                  setParticipants([]);
                  setParticipantInput('Sahil\nKavi\nSamruddhi\nSmita\nNisha\nJaya\nShrutika\nSarita\nSilesh\nKunal\nBunty\nYash\nSpecial Guest');
                  setLeaderboard([]);
                  setSpecialMatches([]);
                }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-colors shadow-lg"
              >
                🎯 New Tournament
              </button>
              <button
                onClick={() => setShowSpecialMatch(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg"
              >
                🎪 View Special Match
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-10 rounded-3xl"></div>
          <div className="relative py-8">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-4">
              🥟 Pani Puri Challenge
            </h1>
            <p className="text-gray-600 text-xl font-medium">The ultimate street food tournament!</p>
          </div>
        </header>

        {!tournament ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-orange-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Tournament Setup</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Participants (Sample data loaded)
                  </label>
                  <textarea
                    value={participantInput}
                    onChange={(e) => {
                      setParticipantInput(e.target.value);
                      const names = e.target.value.split('\n').filter(name => name.trim());
                      setParticipants(names.slice(0, 20));
                    }}
                    placeholder="Enter participant names (one per line)&#10;Max 20 participants"
                    className="w-full h-40 p-4 border-2 border-orange-200 rounded-xl resize-none focus:border-orange-400 focus:outline-none text-lg"
                  />
                  
                  <div className="mt-4 flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      Participants: <span className="font-bold text-orange-600">{participants.length}/20</span> (min 2 required)
                    </span>
                    <button
                      onClick={() => {
                        const shuffled = [...participants].sort(() => Math.random() - 0.5);
                        const newInput = shuffled.join('\n');
                        setParticipantInput(newInput);
                      }}
                      className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors flex items-center gap-1"
                    >
                      <Shuffle size={14} />
                      Shuffle
                    </button>
                  </div>
                </div>
                
                {participants.length > 0 && (
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl border border-orange-200">
                    <h3 className="font-bold text-orange-700 mb-3 text-lg">Tournament Preview:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {participants.map((name, index) => (
                        <div key={index} className="px-3 py-2 bg-white border border-orange-200 rounded-lg text-center font-medium shadow-sm">
                          {name}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <h4 className="font-bold text-blue-700 mb-2">Tournament Options:</h4>
                      <div className="text-sm text-blue-600 space-y-1">
                        <div>• <strong>Random Tournament:</strong> Automatic random matchups for any names</div>
                        <div>• <strong>Custom Matchups:</strong> Uses your specific tournament structure (requires sample names)</div>
                        <div>• <strong>Special Rule:</strong> Highest puri scorer gets second chance in semifinals</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-4">
                  <button
                    onClick={createTournament}
                    disabled={participants.length < 2}
                    className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-xl hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center gap-3"
                  >
                    <Trophy size={24} />
                    Create Random Tournament 
                  </button>
                  <button
                    onClick={() => createCustomTournament()}
                    disabled={participants.length < 13}
                    className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center gap-3"
                  >
                    <Edit3 size={24} />
                    Custom Matchups
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Tournament Bracket
              </h2>
              <div className="flex gap-3">
                {matchTimer > 0 && isTimerRunning && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl border border-red-200 animate-pulse">
                    <Clock size={20} />
                    <span className="font-bold text-lg">{formatTime(matchTimer)}</span>
                  </div>
                )}
                <button
                  onClick={() => setShowSpecialMatch(true)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center gap-2"
                >
                  🎪 Special Match
                </button>
              </div>
            </div>
            
            <BracketView />
            
            {leaderboard.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-orange-200">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-6 flex items-center gap-2">
                  <Star className="text-yellow-500" />
                  Live Leaderboard
                </h3>
                <div className="grid gap-3">
                  {leaderboard.map((player, index) => (
                    <div key={player.name} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300' :
                      index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300' :
                      index === 2 ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-300' :
                      'bg-orange-50 border-orange-200'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-500 text-white' :
                          index === 2 ? 'bg-orange-500 text-white' :
                          'bg-gray-400 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-bold text-lg">{player.name}</div>
                          <div className="text-sm text-gray-500">
                            {player.wins} wins • Avg: {player.avgPuris} puris/match • {player.matchesPlayed} played
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-2xl text-orange-600">{player.totalPuris}</div>
                        <div className="text-sm text-gray-500">total puris</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Special Match Modal */}
        {showSpecialMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 w-full max-w-lg shadow-2xl border-2 border-purple-200">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-purple-600 mb-2">🎪 Special Exhibition Match</h3>
                <p className="text-purple-500">Just for fun - doesn't affect tournament!</p>
              </div>
              
              {specialMatches.length > 0 && (
                <div className="space-y-4">
                  {specialMatches.map((match) => (
                    <div key={match.id} className="bg-white p-6 rounded-2xl border border-purple-200">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-lg text-purple-700">{match.player1}</div>
                          <div className="text-purple-500 font-bold">VS</div>
                          <div className="font-bold text-lg text-pink-700">{match.player2}</div>
                        </div>
                        
                        {match.winner ? (
                          <div className="text-center">
                            <div className="text-2xl mb-2">🏆</div>
                            <div className="font-bold text-green-600">Winner: {match.winner}</div>
                            <div className="text-sm text-gray-600 mt-2">
                              {match.player1}: {match.player1Score.puris} puris • {formatTime(match.player1Score.time)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {match.player2}: {match.player2Score.puris} puris • {formatTime(match.player2Score.time)}
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setCurrentMatch(match)}
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-colors"
                          >
                            Start Special Match!
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <button
                onClick={() => setShowSpecialMatch(false)}
                className="w-full mt-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {currentMatch && (
          <MatchModal
            match={currentMatch}
            onClose={() => setCurrentMatch(null)}
            onRecord={recordMatch}
          />
        )}
      </div>
    </div>
  );
};

export default PaniPuriTournament;