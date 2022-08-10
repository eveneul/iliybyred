$(function () {
	$(window).trigger('scroll');

	/**
	 * 접근성 & UX 개선 (키보드 사용할때만 포커스 나오게)
	 *
	 * @version 1.0.0
	 * @since 2022-01-16
	 * @author ohhaneul
	 */

	//커서

	const w = 124;
	const h = 124;

	$(window).mousemove(function (e) {
		const xVal = e.clientX;
		const yVal = e.clientY;

		gsap.to('.cursor', {
			x: xVal,
			y: yVal,
		});
	});

	$('a').mousemove(function (e) {
		gsap.to('.cursor', {
			width: w,
			height: h,
			xPercent: -50,
			yPercent: -50,
		});

		if ($(e.target).parents('.visual-left').length) {
			$('.cursor').html('<span>discover</span>');
		} else if ($(e.target).parents('.visual-right').length) {
			$('.cursor').html('<span>event</span>');
		} else if ($(e.target).parents('.sc-product').length) {
			$('.cursor').html('<span>click</span>');
		} else if ($(e.target).parents('.sc-story').length) {
			$('.cursor').html('<span>story</span>');
		} else if ($(e.target).parents('.sc-video').length) {
			$('.cursor').html('<span>view</span>');
		} else {
			$('.cursor').html('');
		}
	});

	$('a').mouseout(function (e) {
		gsap.to('.cursor', {
			width: 0,
			height: 0,
		});
	});

	// belog

	$('.event-item').each(function (idx, el) {
		const child = $(this).find('a');

		gsap.from(child, {
			opacity: 0,
			yPercent: 20,
			scrollTrigger: {
				trigger: el,
				start: 'top 80%',
				end: 'bottom top',
			},
		});
	});

	// // 메인 페이지 오토 슬라이드
	var swiper = new Swiper('.visual-left .swiper', {
		effect: 'fade',
		spaceBetween: 0,
		centeredSlides: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		speed: 1000,
		pagination: {
			el: '.count',
			type: 'fraction',
		},
		navigation: {
			nextEl: '.btn-set.next',
			prevEl: '.btn-set.prev',
		},
		loop: true,
		on: {
			init: function () {
				$('.swiper-progress-bar').removeClass('animate');
				$('.swiper-progress-bar').removeClass('active');
				$('.swiper-progress-bar').addClass('animate');
				$('.swiper-progress-bar').addClass('active');
			},
			slideChangeTransitionStart: function () {
				$('.swiper-progress-bar').removeClass('animate');
				$('.swiper-progress-bar').removeClass('active');
				$('.swiper-progress-bar').addClass('active');
			},
			slideChangeTransitionEnd: function () {
				$('.swiper-progress-bar').addClass('animate');
			},
		},
	});

	// 배경 텍스트 롤링

	gsap.set('.rolling-text p', {
		yPercent: -100,
	});

	gsap.set('.turn', {
		yPercent: 0,
	});

	const rollingText = gsap
		.timeline({
			defaults: {
				ease: 'none',
				delay: 3,
			},
		})
		.addLabel('m1')
		.to('.rolling-text .tone', { yPercent: 0 }, 'm1')
		.to('.rolling-text .turn', { yPercent: 100 }, 'm1')
		.set('.rolling-text .turn', { yPercent: -100 })
		.addLabel('m2')
		.to('.rolling-text .turn', { yPercent: 0 }, 'm2')
		.to('.rolling-text .tone', { yPercent: 100 }, 'm2')
		.set('.rolling-text .tone', { yPercent: -100 });
	rollingText.repeat(-1);
	// 색상 선택시

	$('.thumb-item').on('click', function (e) {
		const el = $(e.target);
		el.parent().children().removeClass('active');
		el.addClass('active');
		el.parent().siblings('.color-desc').text(el.data('color'));
	});

	// sc-product 부분 스와이퍼

	var swiper = new Swiper('.best-slide', {
		slidesPerView: 4,
	});

	// 파란색 배경

	gsap.to('.bg', {
		autoAlpha: 1,
		ease: 'power1.in',
		scrollTrigger: {
			trigger: '.sc-visual',
			start: 'bottom center',
			end: 'bottom 100px',
			scrub: 1,
		},
	});

	gsap.to('.visual-typo', {
		autoAlpha: 0,
		ease: 'power1.in',
		scrollTrigger: {
			trigger: '.sc-visual',
			start: 'bottom bottom',
			end: 'bottom 800px',
			scrub: 1,
		},
	});

	gsap.to('.visual-figure', {
		autoAlpha: 0,
		ease: 'power1.in',
		scrollTrigger: {
			trigger: '.sc-visual',
			start: 'bottom bottom',
			end: 'bottom 800px',
			scrub: 1,
		},
	});

	// 버블 움직임

	const bubble = gsap.from('.sc-story .bubble', {
		scale: 0,
		opacity: 0,
		paused: true,
		stagger: 0.1,
	});

	ScrollTrigger.create({
		trigger: '.sc-story',
		start: 'top 40%',
		end: 'bottom top',
		onEnter: () => {
			bubble.play();
		},

		// animations: bubble,
	});

	$('.sc-story').mousemove(function (e) {
		$('.bubble').each(function (idx, el) {
			const speed = $(this).data('speed');
			const x = ($(window).outerWidth() - e.offsetX * speed) / 200;
			const y = ($(window).outerHeight() - e.offsetY * speed) / 200;

			gsap.to(el, {
				x: x,
				y: y,
			});
		});
	});
});

// footer

gsap.from('.footer .inner', {
	yPercent: 20,
	opacity: 0.5,
	scrollTrigger: {
		trigger: '.container',
		start: 'bottom bottom',
		end: 'bottom top',
		scrub: 0,
	},
});
