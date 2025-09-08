    $(document).ready(function () {
      let mouseX = 0, mouseY = 0;
      let followerX = 0, followerY = 0;

      $(document).mousemove(function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function animateFollower() {
        // Move follower toward the mouse with easing
        followerX += (mouseX - followerX) * 0.075;
        followerY += (mouseY - followerY) * 0.075;

        $('#follower').css({
          left: followerX + 'px',
          top: followerY + 'px'
        });

        requestAnimationFrame(animateFollower);
      }

      animateFollower();

      
    });