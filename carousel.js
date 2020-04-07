(function() {

    console.log('looking for carousels');

    const SLIDE_TIMER = 2000;

    const carousels =
        document.querySelectorAll ( '.carousel-wrapper' );

        console.log('found carousels', carousels);

        carousels.forEach( carousel => startCarousel( carousel) );
       
        function startCarousel ( carousel ) {


            let paused = true;
            const slides = carousel.querySelectorAll('.carousel-photo')

            initializeElementClasses();
            initializeElementClickHandlers();

            setTimeout( nextSlide , prevSlide , SLIDE_TIMER );

            function nextSlide() {
                
                if( paused ){
                    return;
                }

                const active = carousel.querySelector( '.active.carousel-photo');
                const next = carousel.querySelector( '.next.carousel-photo');
                const prev = carousel.querySelector( '.prev.carousel-photo');
                console.log({ active , next , prev });
                
                prev.classList.remove( 'prev' );

                active.classList.remove( 'active' );
                active.classList.add( 'prev')

                next.classList.remove( 'next' );
                next.classList.add( 'active' );

                let newNext = next.nextElementSibling;

                console.log({prev: active , active: next, next: newNext });

                if( ! newNext || ! newNext.classList.value.includes( 'carousel-photo' ) ) {
                     newNext = slides[0];
                }
                
                newNext.classList.add('next');
                
                
                setTimeout( nextSlide , SLIDE_TIMER );

            }

            function prevSlide() {
                
                if( paused ){
                    return;
                }

                const active = carousel.querySelector( '.active.carousel-photo');
                const next = carousel.querySelector( '.next.carousel-photo');
                const prev = carousel.querySelector( '.prev.carousel-photo');

                console.log( 'before switching previous', { active , next , prev });
                
                next.classList.remove( 'next' );

                active.classList.remove( 'active' );
                active.classList.add(  'next' );

                prev.classList.remove( 'prev' );
                prev.classList.add( 'active' );

                let newPrev = prev.previousElementSibling;

                console.log( newPrev );
                
                if( ! newPrev || ! newPrev.classList.value.includes( 'carousel-photo' ) ) {
                    console.log('wrapping new prev to last slide')
                    newPrev = slides[slides.length-1];
                }
                
                newPrev.classList.add('prev');
                
                console.log('after', {next: active , active: prev, prev: newPrev });
                
                setTimeout( prevSlide , SLIDE_TIMER );
            }

            function initializeElementClasses(){
              
                console.log('initialize elements' );

                const initial = carousel.querySelector( '.initial.carousel-photo' ) || slides[0];
                const prev = initial.previousElementSibling || slides[ slides.length -1 ];
                const next = initial.nextElementSibling;

                console.log({ initial, prev, next} , next.classList.val );

                if ( ! next || ! next.classList.value.includes( 'carousel-photo' ) ) {
                    next = slides[0];
                }

                initial.classList.add( 'active' );
                initial.classList.remove( 'initial' );
                next.classList.add( 'next' );
                prev.classList.add( 'prev' );
            }

    
     function initializeElementClickHandlers(){
          const nextButton = carousel.querySelector( '.carousel-button.next' );
           const prevButton = carousel.querySelector( '.carousel-button.prev' );

           slides.forEach(slide => {
                slide.addEventListener ('click' , () => {  
                    
                    paused = !paused;
                    console.log('Photo was clicked! Paused:' , paused );

                    if( !paused ){   
                     nextSlide(); 
                     console.log('Should switch');
                    }
                    
                })
                    
           })
           

          nextButton.addEventListener('click' , () => {
              paused = false;
              nextSlide();
              paused = true;
            })

            prevButton.addEventListener('click' , () => {
                paused = false;
                prevSlide();
                paused = true;
              })
        }
    }
} () );