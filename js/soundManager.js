
class SoundTrackData{
    constructor(_pos, _key){
        this.pos = _pos
        this.key = _key
    }
}

class SoundManager {
    constructor(_scene){
        this.scene = _scene
        _scene.events.on('update', this.Update, this);
        
        this.audioInitied = false
        this.currSoundTrack = 'none'
        this.OST_VOLUME = 0.3
        this.FX_VOLUME = 0.3
        
        this.soundTracksLength = 12
        this.soundTracks = [
            new SoundTrackData(0, 'intro_OST'), new SoundTrackData(1, 'title_OST'), new SoundTrackData(2, 'playerSelect_OST'), new SoundTrackData(3, 'playerSelectZelda_OST'), 
            new SoundTrackData(4, 'overworld_OST'), new SoundTrackData(5, 'powerUp_OST'), new SoundTrackData(6, 'tailCave_OST'), new SoundTrackData(7, 'sideScrolling_OST'), 
            new SoundTrackData(8, 'miniBoss_OST'), new SoundTrackData(9, 'boss_OST'), 
            new SoundTrackData(10, 'instrumentsOfTheSirens_OST'), new SoundTrackData(11, 'fullMoonCello_OST')
        ];
        
        this.OST = [
            this.scene.sound.add('intro_OST').setVolume(this.OST_VOLUME).setLoop(true),
            this.scene.sound.add('title_OST').setVolume(this.OST_VOLUME).setLoop(true),
            this.scene.sound.add('playerSelect_OST').setVolume(this.OST_VOLUME).setLoop(true),
            this.scene.sound.add('playerSelectZelda_OST').setVolume(this.OST_VOLUME).setLoop(true),
            this.scene.sound.add('overworld_OST').setVolume(this.OST_VOLUME).setLoop(true),
            this.scene.sound.add('powerUp_OST').setVolume(this.OST_VOLUME).setLoop(true),
            this.scene.sound.add('tailCave_OST').setVolume(this.OST_VOLUME).setLoop(true),
            this.scene.sound.add('sideScrolling_OST').setVolume(this.OST_VOLUME).setLoop(true),
            this.scene.sound.add('miniBoss_OST').setVolume(this.OST_VOLUME).setLoop(true),
            this.scene.sound.add('boss_OST').setVolume(this.OST_VOLUME).setLoop(true),
            this.scene.sound.add('instrumentsOfTheSirens_OST').setVolume(this.OST_VOLUME).setLoop(true),
            this.scene.sound.add('fullMoonCello_OST').setVolume(this.OST_VOLUME).setLoop(true),
        ];
        
    }
    
    GetPos(_soundTrackName){
        for(var i = 0; i < this.soundTracksLength; i++){
            if(_soundTrackName == this.soundTracks[i].key)
                return this.soundTracks[i].pos
        }
        
        console.log('key not found')
        return -1
    }
    
    InitBGAudio(){
        if (game.sound.context.state === 'suspended') {
            game.sound.context.resume();
        }
        
        if(!this.audioInitied){
            this.audioInitied = true
            this.PlayOST('tailCave_OST')
        }
        
    }
    
    PlayFX(_soundEffect){
        var newSound = this.scene.sound.add(_soundEffect).setVolume(this.FX_VOLUME)
        newSound.play()
    }
    
    PlayOST(_soundTrack, _ignoreIfAlreadyPlaying = true){
        if(this.currSoundTrack != _soundTrack || !_ignoreIfAlreadyPlaying){
            console.log('in')
            if(this.currSoundTrack != 'none')
                this.OST[this.GetPos(this.currSoundTrack)].pause()
            
            this.currSoundTrack = _soundTrack
            
            this.OST[this.GetPos(_soundTrack)].play()
        }
    }
    
    
    Update(){
        this.InitBGAudio()
    }
    
    
}





