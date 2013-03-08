/*!
* @author: Wolfgang Drescher - wolfgangdrescher.ch
* @date: 2011-06-15
* @description: LetterWave
* @version: 1.1
* @created: 2011-01-20
*/

var LetterWave = new Class({
	
	Implements: [Options],
	
	options : {
		gap: 20,
		duration: 300,
		delay: 150,
		transition: Fx.Transitions.linear
	},
	
	initialize : function(element, options) {
		this.setOptions(options);
		this.element = document.id(element);
		this.prepare();
		this.stretch();
	},
	prepare : function () {
		this.element.set('html', this.element.get('html').replace(/(.)/g,'<span>$1</span>'));
	},
	stretch : function() {
		this.element.getElements('span').each(function(letter) {
			var letterStretch = new Fx.Morph(letter, {
				transition: this.options.transition,
				duration: this.options.duration
			});
			letter.addEvents({
				'mouseenter' : function () {
					letterStretch.cancel();
					letterStretch.start({
						'padding-left' : this.options.gap,
						'padding-right' : this.options.gap
					});
				}.bind(this),
				'mouseout' : function () {
					(function(){
						letterStretch.cancel();
						letterStretch.start({
							'padding-left' : 0,
							'padding-right' : 0
						});
					}).delay(this.options.delay);
				}.bind(this)
			});
		}.bind(this));
	}
});