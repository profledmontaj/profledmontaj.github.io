window.addEventListener('DOMContentLoaded', () => {
    // modal navigation
    const body = document.body;
    const buttons = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal-layout');
    const closeButton = modal.querySelector('.fa-xmark');


    const scrollWidth = getScrollWidth();

    let currentModalContent ;

    buttons.forEach(modalButton => {
        modalButton.onclick = openModal;
    })
    modal.onclick = closeModal;
    closeButton.onclick = closeModal;
    body.onkeydown  = closeModal;

    function getScrollWidth() {
        const div = document.createElement('div');
        div.classList.add('divScrollCatcher');
        body.append(div);

        const width = div.offsetWidth - div.clientWidth;
        div.remove();
        return width;
    }
    function openModal(e) {
        modal.classList.remove('hide');
        body.classList.add('holdPageScroll');
        body.style.paddingRight = `${scrollWidth}px`;
        currentModalContent = e.currentTarget.dataset.modal;
        modal.querySelector(`[data-content="${currentModalContent}"]`).classList.remove('hide')

    }
    function closeModal(e) {
        const isModalLayout = e.target === modal;
        const isEscButton = e.code === "Escape";
        const isCloseMark = e.target === closeButton;

        if (isCloseMark || isModalLayout || isEscButton)  {
            modal.classList.add('hide');
            body.classList.remove('holdPageScroll');
            body.style.paddingRight = '';
            modal.querySelector(`[data-content="${currentModalContent}"]`).classList.add('hide')
        }
    }

    //gallery tabs
    const tabButtonsContainer = document.querySelector('.galery__tab-buttons-container');
    const tabButtons = [...tabButtonsContainer.querySelectorAll('[data-tab-button]')];
    const tabs = [...document.querySelectorAll('[data-tab]')];
    

    let activeButtonAndTab = [tabButtons[0], tabs[0]];

    console.log(tabButtons[0].dataset.tabButton
        )    

    tabButtons.forEach(button => {
        button.onclick = (e) => {
            if (window.innerWidth < 960 && e.currentTarget === activeButtonAndTab[0]) {
                showButtons();
            } else {
                removeShowButtons();
            }
            if (e.currentTarget === activeButtonAndTab[0]) {
                return;
            }
            removeActiveButtonTab();
            activeButtonAndTab[0] = e.currentTarget;
            activeButtonAndTab[1] = document.querySelector(`[data-tab='${e.currentTarget.dataset.tabButton}']`);
            if (window.innerWidth < 960) tabButtonsContainer.insertAdjacentElement('afterbegin', activeButtonAndTab[0]);
            addActiveButtonTab();
        }
    })
    window.onresize = removeShowButtons; 
    window.onscroll = removeShowButtons; 
    window.onclick = (e) => {
        if (!e.target.dataset.tabButton) {
            removeShowButtons()
        }
    }; 

    function showButtons() {
        tabButtons.forEach(button => {
            button.classList.add('show');
        })
    }
    function removeShowButtons() {
        tabButtons.forEach(button => {
            button.classList.remove('show');
        })
    }

    function removeActiveButtonTab() {
        activeButtonAndTab[0].classList.remove('active');
        activeButtonAndTab[1].classList.remove('active');
    }

    function addActiveButtonTab() {
        activeButtonAndTab[0].classList.add('active');
        activeButtonAndTab[1].classList.add('active');
    }

    // sliders 
    const swiper1= new Swiper('.swiper1', {
        loop: true,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
         breakpoints: {
            320: {
                slidesPerView: 1,
            },
            700: {
                slidesPerView: 2,
            },
            993: {
                slidesPerView: 3,
            }
        }
    });
    const swiper2= new Swiper('.swiper2', {
        loop: true,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
         breakpoints: {
            320: {
                slidesPerView: 1,
            },
            700: {
                slidesPerView: 2,
            },
            993: {
                slidesPerView: 3,
            }
        }
    });
    const swiper3= new Swiper('.swiper3', {
        loop: true,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
         breakpoints: {
            320: {
                slidesPerView: 1,
            },
            700: {
                slidesPerView: 2,
            },
            993: {
                slidesPerView: 3,
            }
        }
    });

    // choose lighter 
    const orderButtons = [...document.querySelectorAll('[data-light]')];
    orderButtons.forEach(button => {
        button.onclick = () => {
            const tagetInput = document.querySelector('[data-light-target]');
            
            tagetInput.value = button.dataset.light;
            tagetInput.name = 'Я хочу';
           
        }
    })

    // send forms
   const forms = [...document.querySelectorAll('form')];

   const response = async (url, method, body) => {
        const request = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })

        if (request.ok) {
            window.location.href = `${window.location.href}/thanks.html`;
        }
   }
   

   forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let data = {};

        const inputs = [...form.querySelectorAll('input')];
        inputs.forEach(input => {
            if (input.type === 'radio' && input.checked) {
                data[`${input.name.replace(/\[\]/, '')}`] = input.value;
                return;
            }
            if (input.type === 'checkbox' && input.checked) {
                if (data[`${input.name}`] === undefined ) {
                   data[`${input.name}`] = [input.value];
                } else {
                    data[`${input.name}`].push(input.value)
                }
                return;
            }
            if ((input.type === 'range' || input.type === 'text' || input.type === 'tel' || input.type === 'date' || input.type === 'time' || input.type === 'email' || input.type === 'hidden') && input.value) {
                data[`${input.name.replace(/\[\]/, '')}`] = input.value;
                return;
            }

            
          
            
        })
        
        if (data['Телефон'] !== null && data['Телефон'] !== undefined && data['Телефон'] !== '' && data["Ім'я"] !== null && data["Ім'я"] !== undefined && data["Ім'я"] !== ''   ) {
            console.log(data['Телефон'])
            console.log(data["Ім'я"])
            response('./server.php', 'POST', data);
        }
        
    })
   })
})