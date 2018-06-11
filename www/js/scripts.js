$(document).ready(function() {

	var
		screen = 0,
		screenOX = 0,
		initialPoint,
		finalPoint;
		
//обрабатываем листание

document.addEventListener('touchstart', function(event) {
	initialPoint=event.changedTouches[0];
}, false);
document.addEventListener('touchend', function(event) {

	finalPoint=event.changedTouches[0];
	var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
	var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);

//проверка вертикального свайпа

	if (yAbs>70) {
		if (finalPoint.pageY < initialPoint.pageY){
			//down
			if(screen<2){
				screen++
			}
		}
		else if(finalPoint.pageY > initialPoint.pageY){
			//up
			if(screen==0){
			}
			else{
				screen--
			}
		}
	}
	
	var pages = $('.page'),
		buttonOne = $('#valueOne'),
		buttonTwo = $('#valueTwo'),
		buttonThree = $('#valueThree'),
		buttons = $('.buttons__item'),
	 	thirdSlide = $('.third-slide'),
	 	container = $('.maincontent'),
	 	runner = $('.runner'),
	 	position = (-screen * 100) + '%',
	 	positionX = (-screenOX * 100) + '%';

		pages.eq(screen).addClass('active').siblings().removeClass('active');
		container.css('top', position);
		thirdSlide.animate({ left : positionX}, 500);

	//работа кнопок и отображение их состояния

	buttons.each(function(index) {
		if (position == '0%'){
			buttonOne.prop('checked','checked')
			runner.hide()
		}
		else if (position == '-100%'){
			buttonTwo.prop('checked','checked')
			runner.hide()
		}
		else{
			buttonThree.prop('checked','checked')
			runner.show()
		}

		$(this).on('click', function(){
			if (index==0){
				container.css('top', '0%');
				position = '0%';
				screen = 0;
				runner.hide()
			}
			else if(index==1){
				container.css('top', '-100%');
				position = '-100%';
				screen = 1;
				runner.hide()
			}
			else{
				container.css('top', '-200%');
				position = '-200%';
				screen = 2;
				runner.show()
			}
			console.log(position)
			return position
		})
	})

}, false);


//работа бегунка

	$('.runner').on('change',function(e){
		e.preventDefault

		var runner = $('.runner'),
			thirdSlide = $('.third-slide'),
			val = runner.val();
			
		console.log('поймал значение '+val);
		runner.css({'background':'-webkit-linear-gradient(left ,#C7EAFF 0%,#C7EAFF '+val+'%,#3A4F64 '+val+'%, #3A4F64 100%)'});
		if (val==0){
			screenOX=0
		}
		else if (val==50){
			screenOX=1
		}
		else{
			screenOX=2
		}
		console.log(screenOX);
		var positionX = (-screenOX * 100) + '%';
		thirdSlide.animate({ left : positionX}, 500);
	})
})

