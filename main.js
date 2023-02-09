(async() => {
    function getPosts(pageNumber = 1){  // ЗАПРОС ПО НОМЕРУ СТРАНИЦЫ И РАЗМЕРУ СТРАНИЦЫ
    return fetch(`https://swapi.dev/api/planets?page=${pageNumber}`)
     .then(response => response.json())
    }

    function getPostUrl(url){ // ЗАПРОС ПО ID // функция сделает запрос на какой-то один пост по id
    return fetch(`${url}`)
    .then(response => response.json())
    }
    //getPosts(2, 30).then(console.log);


        function renderPosts(posts){ //передаем свойство entities, которое из ответа на запрос - ответ.entities
        
            const cardsEl = document.querySelector('.cards'); //получим эл-т из DOM, куда мы будем вставлять postStrArr
            const postStrArr = posts.map( //перебираем массив объектов, post - объект. Отрендерим карточку с помщью ответов сервера - возьмем title. body. id из ответа /////так же для модального окна из HTML добавили в <a> (при нажатии на кнопку "Перейти" появляется модальное окно) классы Бутстрапа - data-bs-toggle="modal" data-bs-target="#exampleModal", которые уже содержат обработчик событий(помним, что в Бутстрапе есть и встроенный JS), но нам еще плюс к этому нужно навесить и свой обработчик для кнопки 'Перейти', чтобы все работало правильно, поэтому добавляем еще и класс js-open-modal и пишем функцию-обработчик handleModal 
                post => `<div class="cards">  
                        <div class="card">
                            <div class="card-body">
                            <h5 class="card-title">${post.name}</h5>
                            <p class="card-text"><span>Diameter:</span> ${post.diameter}</p>
                            <p class="card-text"><span>Population:</span> ${post.population}</p>
                            <p class="card-text"><span>Climate:</span> ${post.climate}</p>
                            <p class="card-text"><span>Terrain:</span> ${post.terrain}</p>
                            <p class="card-text"><span>Gravity:</span> ${post.gravity}</p>
                            <a href="#" class="btn js-open-modal btn-primary" data-url=${post.url} data-bs-toggle="modal" data-bs-target="#exampleModal">More detailed</a> 
                            </div>
                        </div>               
                    </div>`//превращаем в строку  в которой можно записыпать JS через синтаксис ${название переменной}
            ).join(''); // используя map, он нам вернет массив со строковым представлением постов: ["<div class=\"cards\"> \n <div class=\"card\">\n <div class=\"card-body\">\n ..., "<div class=\"cards\"> \n <div class=\"card\">\n <div class=\"card-body\">\n ..., и т.д.]. Но нам нужно вернуть это все в виде строки, поэтому испотзуем join(''), чтобы склеивает массив
            
            cardsEl.innerHTML = postStrArr; //в полученный элемент из DOM вставляем postStrArr
            //console.log(postStrArr)
            }


        function renderPaginator(pageSize, pageNumber, count){ //важно для нас - pageSize - размер страницы (сколько на ней элементов), на какой странице сейчас находимся - pageNumber и сколько всего у нас постов сейчас - total

            const paginatoinEl = document.querySelector('.pagination') //получем эл-т из DOM
        
            let lis = `<li class="page-item active"><a class="page-link background" href="#" data-page='1'>1</a></li>`; // необходимо зафиксировать что первая страница по умлч. активная, поэтому можно сразу захардкодить и поставить номер страницы - 1  и добавить класс active(этот класс из бутстрапа). Тогла наш цикл начнет с i = 1
            for(let i=1; i< Math.round(count/pageSize); i++){ //нам нужно определить какое количество страниц у нас будет. total - общее количество элементов(их 100 штук), а pageSize - сколкьо эл-ов помещается на 1й странице. Делим эти значения(округлим цифру в большую сторону(надо смотреть как правильнее округлить - вниз или вверх), будет 13) и через цикл получим 13 элементов
                lis+= `<li class="page-item"><a class="page-link background" href="#" data-page='${i+1}'>${i+1}</a></li>` //так же добавим аттрибут data-page, чтобы мы могли видеть и получать номер страницы. Так же отобразиться в HTML
            }
        
            const html = //<li class="page-item"><a class="page-link" href="#">1</a></li> //нужно создать и добаялть определееное количество li с номером страницы
             `<li class="page-item"><a class="page-link background" href="#">Back</a></li>
             ${lis}
             <li class="page-item"><a class="page-link background" href="#">Next</a></li>
            `;
        
            paginatoinEl.innerHTML = html; //вставляем html в элемент из DOM 
        
            }
        
           async function renderPostInModal(post){ // отрендерим пост, который в модальном окне
                document.querySelector('.modal-title').innerHTML = post.name; // нам нужно добавить в наше модальное окно title и body из ответа на запрос(post), 
                const modalEl = document.querySelector('.modal-body');
    
                

                 const info = `<p class="card-text"><span>Diameter:</span> ${post.diameter}</p>
                <p class="card-text"><span>Population:</span> ${post.population}</p>
                <p class="card-text"><span>Climate:</span> ${post.climate}</p>
                <p class="card-text"><span>Terrain:</span> ${post.terrain}</p>
                <p class="card-text"><span>Gravity:</span> ${post.gravity}</p></p>`;
                
                const filmsArr = await Promise.all (post.films.map(film =>fetch(film).then(response => response.json())));
                //console.log(filmsArr);

                const filmsInfoAll = `<p class="card-text"><span>Films:</span></p>`;
                //console.log(filmsInfoAll)
                const filmsInfo = (filmsArr.map(film => {
                    return `<p class='details-film'>
                    <span>Title:</span> ${film.title}<br>
                    <span>Episode:</span> ${film.episode_id}<br> 
                    <span>Release date:</span> ${film.release_date}
                    </p>`   
                })).join('');

                const residentsInfoAll = `<p class="card-text"><span>Characters:</span>`;
                const residentsArr = await Promise.all (post.residents.map(resident =>fetch(resident).then(response => response.json())));

                //console.log(residentsArr);
                 
                const residentsInfo =  
                    (residentsArr.map(character =>{  
                    
                    return `<p class='details-film'>
                        <span>Name:</span> ${character.name}<br>
                        <span>Gender:</span> ${character.gender}<br> 
                        <span>Birth year:</span> ${character.birth_year}<br>
                        <span>Homeworld:</span> ${(async () =>{
                        const hg = await fetch(character.homeworld)
                        const fg = await hg.json()
                        console.log (fg.name) })()}
                        </p>`
                })).join('');
                
                



                modalEl.innerHTML = `${info} ${filmsInfoAll} ${filmsInfo} ${residentsInfoAll} ${residentsInfo} `
                // `<p class="card-text"><span>Films:</span> ${.then(result => 
                // `<p class='details-film'>
                // <span>Title:</span> ${result.title}<br>
                // <span>Episode:</span> ${result.episode_id}<br> 
                // <span>Release date:</span> ${result.release_date}
                // </p>` )))} 
                // <p class="card-text"><span>Characters:</span> ${
                //     await Promise.all (post.residents.map(resident =>fetch(resident).then(response => response.json()).then(result => 
                //     `<p class='details-film'>
                //     <span>Name:</span> ${result.name}<br>
                //     <span>Gender:</span> ${result.gender}<br> 
                //     <span>Birth year:</span> ${result.birth_year}<br>
                //     <span>Homeworld:</span> ${console.log(getN(`${result.homeworld}`).then(result => result.name))}      
                //     </p>`    
                //  )))}    
                

                // async function getN(obj){
                //         let response = await fetch(obj);
                //         let N = await response.json();
                //         //console.log(N) ; // здесь выводится объект
                //         return N; 
                // }   
                 

                // modalEl.innerHTML =  
                // `<p class="card-text"><span>Diameter:</span> ${post.diameter}</p>
                // <p class="card-text"><span>Population:</span> ${post.population}</p>
                // <p class="card-text"><span>Climate:</span> ${post.climate}</p>
                // <p class="card-text"><span>Terrain:</span> ${post.terrain}</p>
                // <p class="card-text"><span>Gravity:</span> ${post.gravity}</p>
                // <p class="card-text"><span>Films:</span> ${await Promise.all (post.films.map(film =>fetch(film).then(response => response.json()).then(result => 
                // `<p class='details-film'>
                // <span>Title:</span> ${result.title}<br>
                // <span>Episode:</span> ${result.episode_id}<br> 
                // <span>Release date:</span> ${result.release_date}
                // </p>` )))} 
                // <p class="card-text"><span>Characters:</span> ${
                //     await Promise.all (post.residents.map(resident =>fetch(resident).then(response => response.json()).then(result => 
                //     `<p class='details-film'>
                //     <span>Name:</span> ${result.name}<br>
                //     <span>Gender:</span> ${result.gender}<br> 
                //     <span>Birth year:</span> ${result.birth_year}<br>
                //     <span>Homeworld:</span> ${console.log(getN(`${result.homeworld}`).then(result => result.name))}      
                //     </p>`    
                //  )))}    
                // </p>`

                // async function getN(obj){
                //         let response = await fetch(obj);
                //         let N = await response.json();
                //         //console.log(N) ; // здесь выводится объект
                //         return N; 
                // }   
            }
            
        
             function handlePaginator(){ // ОБРАБОТЧИК ПАГИНАТОРА // навесим обработчик на пагинатор. 
            document.querySelector('.pagination').addEventListener(//Т.к. наши li создаются из renderPaginator, то получаем их родителя - ul из DOM и на него вешаем обработчик 
                'click', 
                async event => {  // пометим эту функцию  async, чтобы внутри нее использовать await
                    event.preventDefault(); // пр нажатии на кнопку страницы, нас кидает наверх, тк переход по якорю - (#), отменим это по умолчанию действие с помощью event.preventDefault
                if (!event.target.classList.contains('page-link')){ //и проверяем объект события event, если нажатие произошло не на один из наших li с классом .page-link, то возврат
                    return;
                }
                // если был клик на наш ЛИ, то делаем далее это =>
                document.querySelectorAll('.page-item').forEach(itemEl => itemEl.classList.remove('active')); // необходимо добавлять класс active при нажатии на какую-либо кнопку страницы и удалять у других этот класс. Класс active находится в <li>, а не в <a>, поэтому получаем доступ к Лишкам с классом 'page-item' и далее перебираем их , чтобы поудалять везде класс active, далее =>
                event.target.parentNode.classList.add('active'); //Т.к. объект события event (кнопка, на которую нажали) - ссылка <a> c классом "page-link", необходимо получить его родителя - <li> и уже на него повесим класс active // цвет кнопки меняется с переключением
        
                const pageNumber = event.target.getAttribute('data-page'); // так же при нажатии на номер страницы - полуим номер страницы       
               // const pageSize = +document.querySelector('.paginator-page-size').value; // при отправке запроса так же поменяем и pageSize, чтобы при переключении на другой номер кнопки сохранялось выбранное пользователем количество постов на странице   
                const {results: posts} = await getPosts(pageNumber); // здесь делаем запрос и передаем нашу номер страницы - pageNumber( с аттрибутом 'data-page'), получаем ответ и вызываем renderPosts(posts)
                renderPosts(posts); // renderPosts как раз должна эти самые посты перезаписать - теперь можно увиедть при первом обновлении страницы что находимс на 1й странице (posts?pageNumber=1&pageSize=8), при нажатии например на 2ю страницу будет - posts?pageNumber=2&pageSize=8 (это можно посмотреть в 'Сеть')
                //console.log(pageNumber); // если нажатие на наши li, то клик
                 
            }) 
            }
        
            function resetPaginator(){ // функция для функции handlePageSize
            document.querySelectorAll('.page-item').forEach(itemEl => itemEl.classList.remove('active')); // удалим все элементы с классом active , которые сейчас есть 
            document.querySelectorAll('.page-item')[1].classList.add('active'); // и выставлять active в первый наш элемент (кнопка 1)
            }
        
            function handlePageSize(count, pageSize){ // ОБРАБОТЧИК РАЗМЕРА СТРАНИЦЫ
            const selectEl = document.querySelector('.paginator-page-size select'); // получаем доступ к select
        
            selectEl.addEventListener('change', 
                async event => { // и вешаем событие 'change' на select // делаем функцию ассинхр -  async, тк внутри await
                 const pageSizeValue = +event.target.value //получаем то значение(value), которое выбрал пользователь в selectе и преобразовываем его из строки в число(т.к. в HTML value - это строка)  
                 //console.log(pageSize)
                 resetPaginator(); // вызывается каждый раз как меняет пользователь размер страницы

                        (async  () =>{
                        let n = []; 
                        for (let i=1; i<=pageSizeValue/pageSize; i++){
                            const {results: posts} = await getPosts(`${i}`);
                            n.push(posts);                                                                
                        }
                        renderPosts(n.flat(2));
                        //console.log(n.flat(2))
                        })();
 
            renderPaginator(pageSize, 1, count); // если у нас изменился размер страницы, нужно перерендерить пагинатор так, чтобы в пагинаторе количество страниц зависело от размера страницы(например, выбрали размер 20, то в пагинаторе теперь 10 страниц; выбрали 8, в пагинаторе стало 5). Он зависит от размера страницы - pageSize, так же зависит от текущей страницы - 1 страница и общего размера страницы - total
                })
            }
        
            function handleModal(){ // ОБРАБОТЧИК ОТКРЫТИЯ МОДАЛ.ОКНА // повесим обработчик на нашу карточку - т.е. при нажатии на кнопку 'Перейти' переход на модалку
                document.querySelector('.cards').addEventListener(
                    'click',
                    async event => {
                        event.preventDefault(); //стандартно отменим поведение по умолчанию - чтобы ссылки наши никуда не переходили
                        if (!event.target.classList.contains('js-open-modal')){ // проверяем, чтобы клик был именно по кнопке Перейти с классом 'js-open-modal', в противном случае просто return
                            return;
                        }
        
                        const postUrl = event.target.getAttribute('data-url') // необходиммо получить id конкретного поста, на котором произошло событие клик - в <a> есть аттрибут data-id с номером id, т.к. это строка, то преобразуем в число
                        const post = await getPostUrl(postUrl) // запрашиваем и получаем в ответ пост с запросившим id
                        //console.log(post)
                        renderPostInModal(post); // теперь необходимо отрендерить этот пост => далее в функцию renderPostInModal
                    } )
            }

            function showAllPosts(count, pageSize){
                document.querySelector('.btn-main').addEventListener(
                    'click',
                    async (event) => {                                                                                
                        let n = []; 
                        for (let i=1; i<=count/pageSize; i++){
                            const {results: posts} = await getPosts(`${i}`);
                            n.push(posts) ;                                                               
                        }    
                        renderPosts(n.flat(2));                        
                    } 
                )
            }
        
         const pageNumber = 1; //чтобы не хардкодить в аргументах функций(постоянно писать числа), запишем их в переменные 

        const {results: posts, count} = await getPosts(pageNumber);
        const pageSize = posts.length; 
        //console.log(pageSize)
        
        //  const {entities: posts, total} = await getPosts(pageNumber, pageSize); //(здесь массив объектов) выполнили деструктуризацию объекта, т.е. вместо этого const posts = (await getPosts(2, 30)).entities; , создали переменную {entities}, а затем эту переменную переименновалив posts //total у нас есть в приходящем ответе от сервера, поэтому мы можем деструктиризировать(записать в переменную как и entities)
          renderPosts(posts);
         
          renderPaginator(pageSize, pageNumber, count);
        
          handlePaginator();
        
          handlePageSize(count, pageSize);
        
          handleModal();
          
          showAllPosts(count, pageSize);
})();




