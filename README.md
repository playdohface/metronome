# PolyMetronome
An advanced metronome app developed using the Web Audio API and Angular.

## What is it and who is it for?
Polymetronome is at its heart a metronome, which is a way to reference tempo, primarily used by musicians during practice. A classic metronome allows to set a a tempo, usually specified in beats per minute, and then plays a sound - usually a click or a beep - at the specified interval.  This is useful because it will hold a musician accountable during practice; often our internal sense of tempo gets skewed during practice and we speed up or slow down when the music should not. Practicing with a simple metronome helps remedy these tendencies by making us aware of them.
Polymetronome offers additional functionality that **helps musicians develop their internal sense of tempo and complex relationships in rhythm**. 

## How do I use it?
### 1. Controls

The controls are fairly simple and intuitive, if you have ever used a metronome. You start and stop with the button labeled "Start". Right beneath it is a button labeled "Tap Tempo", if you repeatedly tap it Polymetronome will detect the tempo and adjust its tempo setting accordingly. You can also manually set the tempo using the slider labeled "Tempo". The Slider labeled "Main Volume" adjusts output volume. 
At the bottom, by default you will see 4 black squares, representing the 4 beats in a 4/4 bar. By tapping them you can toggle each beat separately, und thus make the metronome play patterns instead of just constant beats. 
Above that there is a button labeled "Add new Lane" with an input field labeled "Subdivisions". Enter a positive number between 1 and 16 in the field and push the button, and you will see a new lane of squares appear at the bottom, all of them deactivated by default. Activating some or all of them (by clicking them) will make them audible when the metronome is playing.
On the left below each lane you will find a drop-down menu labeled "Sound". By picking an option here you can change the sound of each lane. 
If you click the button labeled "More Options", below the lane on the right, you will expand the lane-specific options. Here you can set the relative volume for each lane, and delete them. By entering a positive number in the input field labeled "Play every one out of X times" you can make the lane play more sparsely: entering the number 2 will cause the specific lane to not play every second round, entering 3 will make it play only one in three rounds and so on.

### 2. Practice Guide
**1. To improve internal sense of tempo**
The first and most basic exercise is to set the metronome to different tempos and try playing along with it as precisely as possible on your instrument (simplify everything else: if you are a guitar player play just one note, if you are a wind player pick a note that is easy etc.). 
The next step, then, is to gradually make the metronome play more sparsely. Deactivate every second note in the lane to begin with, then use the advanced option to make it play only every second round, then every one in three and so on. You will soon find it challenging to keep the tempo steady while the metronome is not helping you. It is this challenge that will lead to finding internal references for tempo and trusting them, and switching from internal and external tempo reference seamlessly. 

**2. To learn complex rhythms**
Say you want to master 3 against 4 as a rhythm. The first thing you would do is set the metronome on 4/4 and trying to play 3 notes evenly distributed in the same time that the metronome takes to play 4, until it feels about right. This is a good first step, but depending on your level you may not be able to do this, or play your rhythm unevenly without noticing and thus practicing the wrong thing. With Poymetronome, it is easy to get a reference for such a rhythm: just create a lane with 3 subdivisions on top of the lane with 4 and you can listen to the Polyrhythm the way it would be correct. Try playing along with each lane separately at first, and focus on precision. Then make the lane that you are playing along with more sparse and eventually turn it off completely, remembering the sound and the way the polyrhythm feels. It makes sense to start with a slow tempo, and to practice each polyrhythm both ways (playing 3 against 4 and then 4 against 3), and also learn to play along with both lanes simultaneously - either with the same or different sounds/notes. Once you are comfortable with that, try different patterns. The key to learning is to keep looking for exercises that are challenging, but not impossible for your level. Here are some suggestions for interesting polyrhythms to explore:
- 2 and 3 
- 6 and 4
- 6 and 8
- 16 and 4
- 16 and 3
- 3 and 4
- 4 and 5
- 12 and 4
- 12 and 8
- 7 and 4
- 5 and 6

**3. To develop a sense of groove**
One of the most beneficial exercises a musician can do with a metronome is to play "against" it. The simplest example is when you set your metronome to a steady beat and play off-beats to that. Of course you could set a second lane to "perfect" off-beats, but the point of this exercise is to find ways to play those off-beats so they are better than correct. The ultimate goal is to play your off-beats in a way that make the metronome sound like it is swinging, or grooving. A good musician can play groovy rhythms, a great musician can make others sound groovy. A metronome can be a good stand-in for other musicians to practice this. If you can, record yourself and listen back to know whether or not you actually made the metronome sound as groovy as it felt while you played.

**4. For drummers and percussionists: develop limb-independence**
Of course there is nothing keeping you from adding a third and fourth lane and playing along with or against all of them simultaneously. Polymetronome can be a creative tool as well as a practice aid: if you find patterns and relationships that speak to you, incorporate them in your musical vocabulary!

**5. On perfect timing, groove and the limitations of a metronome**
A steady sense of tempo is a prerequisite for good groove, but good groove is not the same as perfect tempo. Some - if not most - rhythms come alive because of the imperfections, intentional and unintentional, that happen when people interpret them. Any metronome can only ever be a point of reference, and does not represent a target for musical interpretation in all but very niche styles. The point of practicing with a metronome is to learn to play without it.  
