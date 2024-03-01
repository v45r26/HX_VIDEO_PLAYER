const player = document.querySelector('.hx-video-player'),
      video_t = document.querySelector('#hx-video'),
      paly_btn = document.querySelector('.hx-video-play-pause-btn'),
      paly_pl = document.querySelector('#hx_play_'),
      paly_pu = document.querySelector('#hx_pause_'),
      volume_btn = document.querySelector('.hx-volume-vol-btn'),
      volume_btn_up = document.querySelector('#hx-vol-btn-up'),
      volume_btn_down = document.querySelector('#hx-vol-btn-down'),
      volume_btn_mute = document.querySelector('#hx-vol-btn-mute'),
      volume_slider = document.querySelector('.hx-volume-slider'),
      volume_fill = document.querySelector('.hx-volume-filled'),
      progress_slider = document.querySelector('.hx-timeline-progress'),
      progress_fill = document.querySelector('.hx-timeline-progress-bar'),
      text_time = document.querySelector('.time-total'),
      speed_btns = document.querySelectorAll('.hx-video-speed-limit'),
      fullscreen_btn = document.querySelector('.hx-video-full-screen-btn');

//GLOBAL VARS
let lastVolume = 1;
let isMouseDown = false;


volume_btn_up.style.display = 'block';
volume_btn_down.style.display = 'none';
volume_btn_mute.style.display = 'none';
paly_pl.style.display = 'block';
paly_pu.style.display = 'none';
//PLAYER FUNCTIONS
function tgl_play() 
{
	if (video_t.paused) 
	{
		video_t.play();
		// paly_pl.style.display = 'none';
		// paly_pu.style.display = 'block';
	} 
	else 
	{
		video_t.pause();
		// paly_pl.style.display = 'block';
		// paly_pu.style.display = 'none';
	}
	// paly_btn.classList.toggle('paused');
}
function tgl_play_btn() 
{
	// paly_btn.classList.toggle('playing');
	if (video_t.paused) 
	{
		paly_pl.style.display = 'block';
		paly_pu.style.display = 'none';
	}
	else
	{
		paly_pl.style.display = 'none';
		paly_pu.style.display = 'block';
	}
}

function tgl_mute() 
{
	if(video_t.volume) 
	{
		lastVolume = video_t.volume;
		video_t.volume = 0;
		volume_btn_up.style.display = 'none';
		volume_btn_down.style.display = 'none';
		volume_btn_mute.style.display = 'block';
		volume_fill.style.width = 0;
	} 
	else 
	{
		video_t.volume = lastVolume;
		volume_btn_up.style.display = 'block';
		volume_btn_down.style.display = 'none';
		volume_btn_mute.style.display = 'none';
		volume_fill.style.width = `${lastVolume*100}%`;
	}
}
function change_volume(e) 
{
	// volume_btn.classList.remove('muted');
	let volume = e.offsetX/volume_slider.offsetWidth;
	volume<0.1 ? volume = 0 : volume=volume; 
	volume_fill.style.width = `${volume*100}%`;
	video_t.volume = volume;
	if (volume > 0.7) 
	{
		volume_btn_up.style.display = '';
		volume_btn_down.style.display = 'none';
		volume_btn_mute.style.display = 'none';
	} 
	else if (volume < 0.7 && volume > 0) 
	{
		volume_btn_up.style.display = 'none';
		volume_btn_down.style.display = '';
		volume_btn_mute.style.display = 'none';
	} 
	else if (volume == 0) 
	{
		// volume_btn.classList.add('muted');
		volume_btn_up.style.display = 'none';
		volume_btn_down.style.display = 'none';
		volume_btn_mute.style.display = '';
	}
	lastVolume = volume;
}
function neat_time(time) 
{
  // var hours = Math.floor((time % 86400)/3600)
  	var minutes = Math.floor((time % 3600)/60);
  	var seconds = Math.floor(time % 60);
	seconds = seconds>9?seconds:`0${seconds}`;
	return `${minutes}:${seconds}`;
}
function update_progress(e) 
{
	progress_fill.style.width = `${video_t.currentTime/video_t.duration*100}%`;
	text_time.innerHTML = `${neat_time(video_t.currentTime)} / ${neat_time(video_t.duration)}`;
	// textTotal.innerHTML = neatTime(video.duration);
	// console.log(progressFill.style.width);
}
function set_progress(e) 
{
	const newTime = e.offsetX/progress_slider.offsetWidth;
	progress_fill.style.width = `${newTime*100}%`;
	video_t.currentTime = newTime*video_t.duration;
}
function launch_fullscreen(element) 
{
	if(element.requestFullscreen) 
	{
		element.requestFullscreen();
	} 
	else if(element.mozRequestFullScreen) 
	{
		element.mozRequestFullScreen();
	} 
	else if(element.webkitRequestFullscreen) 
	{
		element.webkitRequestFullscreen();
	} 
	else if(element.msRequestFullscreen) 
	{
		element.msRequestFullscreen();
	}
}
function exit_fullscreen() 
{
  	if(document.exitFullscreen) 
  	{
    	document.exitFullscreen();
  	} 
  	else if(document.mozCancelFullScreen) 
  	{
    	document.mozCancelFullScreen();
  	} 
  	else if(document.webkitExitFullscreen) 
  	{
    	document.webkitExitFullscreen();
  	}
}
var fullscreen = false;
function tgl_fullscreen() 
{
	fullscreen? exit_fullscreen() : launch_fullscreen(player)
	fullscreen = !fullscreen;
}
function set_speed(e) 
{
	var sp_l = parseFloat(this.dataset.speed);
	console.log(sp_l);
	video_t.playbackRate = sp_l;
	// speed_btns.forEach(speedBtn =>	speed_btns.classList.remove('active'));
	speed_btns.forEach(speedBtn => speedBtn.classList.remove('active'));
	this.classList.add('active');
}
function handle_keypress(e) 
{
	switch (e.key) 
	{
		case " ":
			tgl_play();
		case "ArrowRight":
			video_t.currentTime += 5;
		case "ArrowLeft":
			video_t.currentTime -= 5;
		default:
			return;
	}
}

//EVENT LISTENERS
paly_btn.addEventListener('click', tgl_play);
video_t.addEventListener('click', tgl_play);
video_t.addEventListener('play', tgl_play_btn);
video_t.addEventListener('pause', tgl_play_btn);
video_t.addEventListener('ended', tgl_play_btn);
video_t.addEventListener('timeupdate', update_progress);
video_t.addEventListener('canplay', update_progress);
volume_btn.addEventListener('click', tgl_mute);
window.addEventListener('mousedown', () => isMouseDown = true);
window.addEventListener('mouseup', () => isMouseDown = false);
// volumeSlider.addEventListener('mouseover', changeVolume);
volume_slider.addEventListener('click', change_volume);
progress_slider.addEventListener('click', set_progress);
fullscreen_btn.addEventListener('click', tgl_fullscreen);

speed_btns.forEach(speedBtn => {
	speedBtn.addEventListener('click', set_speed);
});

window.addEventListener('keydown', handle_keypress);