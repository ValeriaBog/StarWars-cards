# StarWars-BD
StarWars BD

* Используя SWAPI, вывести информацию по всех планетам с пагинацией и возможностью просмотреть доп.
* информацию в модальном окне с дозагрузкой смежных ресурсов из каждой сущности.
*
* Данные для отображения в карточке планеты:
* 1. Наименование (name)
* 2. Диаметр (diameter)
* 3. Население (population)
* 4. Уровень гравитации (gravity)
* 5. Природные зоны (terrain)
* 6. Климатические зоны (climate)
*
* При клике по карточке отображаем в модальном окне всю информацию
* из карточки, а также дополнительную:
* 1. Список фильмов (films)
* - Номер эпизода (episode_id)
* - Название (title)
* - Дата выхода (release_date)
* 2. Список персонажей
* - Имя (name)
* - Пол (gender)
* - День рождения (birth_year)
* - Наименование родного мира (homeworld -> name)
*
* Доп. требования к интерфейсу:
* Доп. 1. Выводим 10 карточек на 1 странице
* Доп. 2. Пагинация позволяет переключаться между страницами, выводить общее количество страниц и текущие выбранные
* элементы в формате 1-10/60 для 1 страницы или 11-20/60 для второй и т.д.
* Доп. 3. Используем Bootstrap для создания интерфейсов.
* Доп.4. Добавить кнопку "Показать все" - по клику загрузит все страницы с планетами и выведет
* информацию о них в едином документе
*/