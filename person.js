class Person {
	constructor(upper_length, upper_width, lower_length, lower_width, x, y) {
		this.upper_length = upper_length;
		this.upper_width = upper_width;
		this.lower_length = lower_length;
		this.lower_width = lower_width;
		this.upper_left_leg = Matter.Bodies.rectangle(x, y, upper_width, upper_length, {
			friction: 0.8,
			restitution: 0.2,
			collisionFilter: {
				category: 0x0002,
				mask: 0x0001,
			}
		});
		this.lower_left_leg = Matter.Bodies.rectangle(x, y + upper_length, lower_width, lower_length, {
			collisionFilter: {
				category: 0x0003,
				mask: 0x0001,
			},
			friction: 0.8,
			restitution: 0.2
		});
		this.upper_right_leg = Matter.Bodies.rectangle(x, y, upper_width, upper_length, {
			friction: 0.8,
			restitution: 0.2,
			collisionFilter: {
				category: 0x0004,
				mask: 0x0001,
			}
		});
		this.lower_right_leg = Matter.Bodies.rectangle(x, y + upper_length, lower_width, lower_length, {
			friction: 0.8,
			restitution: 0.2,
			collisionFilter: {
				category: 0x00010,
				mask: 0x0001,
			}
		});
	}

	init() {

		this.left_joint = Matter.Constraint.create({
			bodyA: this.upper_left_leg,
			bodyB: this.lower_left_leg,
			pointA: { x: 0, y: this.upper_length / 2 },
			pointB: { x: 0, y: -this.upper_length / 2 },
			stiffness: 1,
			length: 1,
		});


		this.right_joint = Matter.Constraint.create({
			bodyA: this.upper_right_leg,
			bodyB: this.lower_right_leg,
			pointA: { x: 0, y: this.upper_length / 2 },
			pointB: { x: 0, y: -this.upper_length / 2 },
			length: 1,
			stiffness: 1,
		});

		this.main_joint = Matter.Constraint.create({
			bodyA: this.upper_left_leg,
			bodyB: this.upper_right_leg,
			pointA: { x: 0, y: -this.upper_length / 2 },
			pointB: { x: 0, y: -this.upper_length / 2 },
			length: 1,
		})
	}

	show() {
		beginShape();
		for (let i = 0; i < 4; i++) {
			vertex(this.upper_left_leg.vertices[i].x, this.upper_left_leg.vertices[i].y);
		}
		endShape();

		beginShape();
		for (let i = 0; i < 4; i++) {
			vertex(this.upper_right_leg.vertices[i].x, this.upper_right_leg.vertices[i].y);
		}
		endShape();

		beginShape();
		for (let i = 0; i < 4; i++) {
			vertex(this.lower_left_leg.vertices[i].x, this.lower_left_leg.vertices[i].y);
		}
		endShape();

		beginShape();
		for (let i = 0; i < 4; i++) {
			vertex(this.lower_right_leg.vertices[i].x, this.lower_right_leg.vertices[i].y);
		}
		endShape();
	}
}