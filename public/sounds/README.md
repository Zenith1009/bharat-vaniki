# Quiz Sound Effects

This directory contains sound effects for the quiz system. 

## Required Sound Files:

### Quiz Results Sounds:
1. **success.mp3** - Played when user passes the quiz (60-89% score)
2. **failure.mp3** - Played when user fails the quiz (below passing score)
3. **achievement.mp3** - Played when achievements are unlocked
4. **applause.mp3** - Played for excellent performance (90%+ score) + triggers confetti

### Quiz Interaction Sounds:
5. **click.mp3** - Played when user selects an answer
6. **tick.mp3** - Played during last 3 seconds of timer countdown
7. **warning.mp3** - Played when 5 seconds remain on timer

## Sound Sources:

You can get free sound effects from:
- [Freesound.org](https://freesound.org)
- [Zapsplat](https://zapsplat.com)
- [BBC Sound Effects](https://sound-effects.bbcrewind.co.uk)
- [Pixabay](https://pixabay.com/sound-effects/)

## Recommended Sounds:

### Results Sounds:
- **Success**: Light chime or bell sound (1-2 seconds)
- **Failure**: Gentle "try again" sound, not harsh (1-2 seconds)  
- **Achievement**: Triumphant fanfare or level-up sound (2-3 seconds)
- **Applause**: Crowd applause or celebration sound (3-5 seconds)

### Interaction Sounds:
- **Click**: Soft button click or tap sound (0.5 seconds)
- **Tick**: Clock tick or metronome sound (0.3 seconds)
- **Warning**: Gentle alert or notification sound (1 second)

## File Format:
- Format: MP3
- Quality: 128kbps or higher
- Volume: Normalized to prevent audio spikes
- Keep file sizes small (under 100KB each)

## Volume Levels (configured in code):
- Click: 30% volume
- Tick: 20% volume  
- Warning: 40% volume
- Success: 60% volume
- Failure: 40% volume
- Achievement: 70% volume
- Applause: 50% volume

## Features:
- **Confetti Animation**: Triggered automatically with applause sound for 90%+ scores
- **Achievement System**: Sounds play 2 seconds after results display
- **Timer Integration**: Warning and tick sounds enhance time pressure
- **User Feedback**: Click sounds provide immediate response to interactions