function Firework(x, y) {
  this.firework = new Particle(random(windowWidth), windowHeight, true);
  this.exploded = false;
  this.particles = [];

  this.update = function () {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  };

  this.done = function () {
    if (this.exploded && this.particles.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  this.explode = function () {
    for (let i = 0; i < 100; i++) {
      p = new Particle(this.firework.pos.x, this.firework.pos.y);
      this.particles.push(p);
    }
  };

  this.show = function () {
    if (!this.exploded) {
      this.firework.show();
    }

    this.particles.forEach(function (particle) {
      particle.show();
    });
  };
}
