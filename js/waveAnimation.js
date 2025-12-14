const waveSvg = `<svg width="144" height="105" viewBox="0 0 144 105" fill="none" xmlns="http://www.w3.org/2000/svg" class="wave-svg">
  <g clip-path="url(#clip0_530_33)">
    <mask id="mask0_530_33" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="144" height="105">
      <path d="M0 0H144V105H0V0Z" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_530_33)">
      <path d="M940.147 3.90674C903.863 3.90674 903.863 20.0606 867.573 20.0606C831.283 20.0606 831.289 3.90674 795.005 3.90674C758.722 3.90674 758.722 20.0606 722.438 20.0606C686.154 20.0606 686.154 3.90674 649.87 3.90674C613.586 3.90674 613.586 20.0606 577.302 20.0606C541.019 20.0606 541.019 3.90674 504.735 3.90674C468.451 3.90674 468.451 20.0606 432.167 20.0606C395.883 20.0606 395.883 3.90674 359.599 3.90674C323.315 3.90674 323.315 20.0606 287.032 20.0606C250.748 20.0606 250.748 3.90674 214.464 3.90674C178.18 3.90674 178.18 20.0606 141.896 20.0606C105.612 20.0606 105.612 3.90674 69.3285 3.90674C33.0446 3.90674 33.0447 20.0606 -3.2392 20.0606C-39.523 20.0606 -39.523 3.90674 -75.8069 3.90674C-112.091 3.90674 -112.091 20.0606 -148.375 20.0606C-184.658 20.0606 -184.658 3.90674 -220.942 3.90674C-257.226 3.90674 -257.226 20.0606 -293.51 20.0606C-329.794 20.0606 -329.794 3.90674 -366.078 3.90674C-402.362 3.90674 -402.362 20.0606 -438.645 20.0606C-474.929 20.0606 -495.868 -5.20226 -528 11.5L-515 542H940.147V3.90674Z" fill="white"/>
    </g>
  </g>
  <defs>
    <clipPath id="clip0_530_33">
      <rect width="144" height="105" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

function initWaveAnimation() {
  const waveTrack = document.querySelector('.wave-track');
  if (!waveTrack) return;

  const screenWidth = window.innerWidth;
  const waveWidth = 144;
  const wavesNeeded = Math.ceil(screenWidth / waveWidth) * 3;

  waveTrack.innerHTML = '';

  for (let i = 0; i < wavesNeeded; i++) {
    waveTrack.innerHTML += waveSvg;
  }
}

window.addEventListener('DOMContentLoaded', initWaveAnimation);
window.addEventListener('resize', initWaveAnimation);
