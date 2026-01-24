import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, Bug, Zap } from "lucide-react";

interface Obstacle {
  id: number;
  x: number;
  type: 'bug' | 'keyword';
  label?: string;
}

const BAD_KEYWORDS = [
  "meta vide",
  "H1 absent", 
  "alt manquant",
  "404 error",
  "duplicate",
  "no index",
  "slow load",
  "broken link"
];

// Générateur de sons rétro via Web Audio API
const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

const playJumpSound = () => {
  try {
    const ctx = createAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'square'; // Son 8-bit
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Silently fail if audio not supported
  }
};

const playGameOverSound = () => {
  try {
    const ctx = createAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sawtooth'; // Son plus "crash"
    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // Silently fail if audio not supported
  }
};

const playScoreSound = () => {
  try {
    const ctx = createAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // Silently fail if audio not supported
  }
};

const NotFound = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [playerY, setPlayerY] = useState(0);
  const gameLoopRef = useRef<number>();
  const obstacleIdRef = useRef(0);
  const lastObstacleTimeRef = useRef(0);
  const gameSpeedRef = useRef(4); // Réduit de 20% (était 5)
  const lastSpeedIncreaseRef = useRef(0); // Pour tracker les paliers de 500 points

  const PLAYER_SIZE = 40;
  const GROUND_Y = 60;
  const JUMP_HEIGHT = 120; // Augmenté pour un saut plus dynamique
  const OBSTACLE_WIDTH = 50;

  const jump = useCallback(() => {
    if (isJumping || gameState !== 'playing') return;
    
    playJumpSound(); // Son de saut
    setIsJumping(true);
    setPlayerY(JUMP_HEIGHT);
    
    setTimeout(() => {
      setPlayerY(0);
      setTimeout(() => setIsJumping(false), 150);
    }, 350);
  }, [isJumping, gameState]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setObstacles([]);
    gameSpeedRef.current = 4; // Vitesse initiale réduite
    lastSpeedIncreaseRef.current = 0;
    lastObstacleTimeRef.current = Date.now();
  }, []);

  const handleInteraction = useCallback(() => {
    if (gameState === 'idle') {
      startGame();
    } else if (gameState === 'playing') {
      jump();
    } else if (gameState === 'gameover') {
      startGame();
    }
  }, [gameState, startGame, jump]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleInteraction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInteraction]);

  useEffect(() => {
    if (gameState !== 'playing') {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      return;
    }

    const gameLoop = () => {
      const now = Date.now();
      
      // Spawn obstacles
      const spawnInterval = Math.max(1200 - score * 10, 600);
      if (now - lastObstacleTimeRef.current > spawnInterval) {
        const type = Math.random() > 0.5 ? 'bug' : 'keyword';
        const newObstacle: Obstacle = {
          id: obstacleIdRef.current++,
          x: 100,
          type,
          label: type === 'keyword' ? BAD_KEYWORDS[Math.floor(Math.random() * BAD_KEYWORDS.length)] : undefined
        };
        setObstacles(prev => [...prev, newObstacle]);
        lastObstacleTimeRef.current = now;
      }

      // Move obstacles and check collisions
      setObstacles(prev => {
        const updated = prev
          .map(obs => ({ ...obs, x: obs.x - gameSpeedRef.current * 0.3 }))
          .filter(obs => obs.x > -15);

        // Check collision - hitbox réduite pour être plus permissif
        updated.forEach(obs => {
          const obsLeft = obs.x + 1; // Marge intérieure
          const obsRight = obs.x + 6; // Hitbox réduite
          const playerLeft = 15 + 1; // Marge intérieure
          const playerRight = 15 + 4; // Hitbox réduite

          if (obsLeft < playerRight && obsRight > playerLeft) {
            const currentPlayerY = playerY;
            if (currentPlayerY < 25) { // Seuil réduit pour plus de tolérance
              playGameOverSound(); // Son de game over
              setGameState('gameover');
              setHighScore(prev => Math.max(prev, score));
            }
          }
        });

        return updated;
      });

      // Increase score et accélération tous les 500 points
      setScore(prev => {
        const newScore = prev + 0.1;
        const currentMilestone = Math.floor(newScore / 500);
        if (currentMilestone > lastSpeedIncreaseRef.current) {
          lastSpeedIncreaseRef.current = currentMilestone;
          gameSpeedRef.current = Math.min(gameSpeedRef.current + 0.8, 10);
          playScoreSound(); // Son de palier atteint
        }
        return newScore;
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, playerY, score]);

  return (
    <div 
      className="min-h-screen bg-deep-black flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
      onClick={handleInteraction}
    >
      {/* Neon Grid Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 102, 196, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 102, 196, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dynamic-orange/5 to-transparent" />
      </div>

      {/* 404 Title */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-8xl md:text-9xl font-heading font-bold gradient-text animate-pulse">
          404
        </h1>
        <p className="text-light-gray/60 text-lg font-body mt-2">Page introuvable</p>
      </div>

      {/* Score Display */}
      <div className="relative z-10 flex gap-8 mb-4">
        <div className="text-center">
          <p className="text-xs text-light-gray/50 uppercase tracking-wider">Score</p>
          <p className="text-2xl font-heading font-bold text-dynamic-orange">
            {Math.floor(score)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-light-gray/50 uppercase tracking-wider">Record</p>
          <p className="text-2xl font-heading font-bold text-vibrant-violet">
            {Math.floor(highScore)}
          </p>
        </div>
      </div>

      {/* Game Arena */}
      <div className="relative z-10 w-full max-w-2xl h-48 mx-4 border border-dynamic-orange/30 rounded-xl overflow-hidden bg-deep-black/80 backdrop-blur-sm">
        {/* Scanlines effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
        }} />

        {/* Ground Line */}
        <div 
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-dynamic-orange to-transparent"
          style={{ bottom: `${GROUND_Y}px` }}
        />
        
        {/* Dotted ground decoration */}
        <div 
          className="absolute left-0 right-0 flex gap-4"
          style={{ bottom: `${GROUND_Y - 10}px` }}
        >
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="w-1 h-1 rounded-full bg-dynamic-orange/30"
              style={{ 
                animationDelay: `${i * 0.1}s`,
                animation: gameState === 'playing' ? 'shimmer 0.5s infinite' : 'none'
              }} 
            />
          ))}
        </div>

        {/* Player Robot */}
        <div
          className="absolute transition-transform duration-150 ease-out"
          style={{
            left: '15%',
            bottom: `${GROUND_Y + playerY}px`,
            transform: isJumping ? 'rotate(-10deg)' : 'rotate(0deg)'
          }}
        >
          <div className="relative">
            <Bot 
              size={PLAYER_SIZE} 
              className={`text-neon-cyan drop-shadow-[0_0_10px_rgba(0,245,255,0.8)] ${
                gameState === 'playing' ? 'animate-pulse' : ''
              }`}
            />
            {isJumping && (
              <Zap 
                size={16} 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-dynamic-orange animate-ping"
              />
            )}
          </div>
        </div>

        {/* Obstacles */}
        {obstacles.map(obstacle => (
          <div
            key={obstacle.id}
            className="absolute transition-none"
            style={{
              left: `${obstacle.x}%`,
              bottom: `${GROUND_Y}px`
            }}
          >
            {obstacle.type === 'bug' ? (
              <Bug 
                size={32} 
                className="text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.6)] animate-pulse"
              />
            ) : (
              <div className="flex flex-col items-center">
                <div className="px-2 py-1 bg-red-900/50 border border-red-500/50 rounded text-[10px] text-red-400 font-mono whitespace-nowrap">
                  {obstacle.label}
                </div>
                <div className="w-0.5 h-4 bg-red-500/50" />
              </div>
            )}
          </div>
        ))}

        {/* Idle State Overlay */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center bg-deep-black/60 backdrop-blur-sm">
            <div className="text-center animate-fade-in">
              <p className="text-light-gray text-lg mb-2 font-body">
                Appuyez sur <span className="text-dynamic-orange font-bold">ESPACE</span> ou cliquez pour jouer
              </p>
              <p className="text-light-gray/50 text-sm">
                Évitez les bugs et les mots-clés toxiques !
              </p>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 flex items-center justify-center bg-deep-black/80 backdrop-blur-sm animate-fade-in">
            <div className="text-center p-6">
              <h2 className="text-3xl font-heading font-bold text-red-500 mb-2 animate-pulse">
                GAME OVER
              </h2>
              <p className="text-light-gray/80 mb-4 font-body max-w-xs mx-auto">
                Ne laissez pas votre SEO être un jeu de hasard.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/audit-visibilite-ia');
                  }}
                  className="bg-gradient-to-r from-dynamic-orange to-vibrant-violet hover:opacity-90 text-white font-bold"
                >
                  Retourner au scan sérieux
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    startGame();
                  }}
                  className="border-dynamic-orange/50 text-dynamic-orange hover:bg-dynamic-orange/10"
                >
                  Rejouer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="relative z-10 mt-6 text-center">
        <p className="text-light-gray/40 text-sm font-body">
          <span className="text-dynamic-orange">ESPACE</span> ou <span className="text-dynamic-orange">CLIC</span> pour sauter
        </p>
      </div>

      {/* Home Link */}
      <div className="relative z-10 mt-8">
        <a 
          href="/" 
          className="text-light-gray/50 hover:text-dynamic-orange transition-colors text-sm underline"
          onClick={(e) => e.stopPropagation()}
        >
          Retour à l'accueil
        </a>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-dynamic-orange/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-vibrant-violet/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-vibrant-violet/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-dynamic-orange/30" />
    </div>
  );
};

export default NotFound;
