
Небольшое приложение поиска данных о стране по ее частичному или полному имени. Использую Rest Countries API, а именно ендпоинт /name, возвращающий массив объектов стран попавших под критерий поиска.

Интерфейс очень простой. Название страны для поиска пользователь вводит в текстовое поле.
Если бекенд вернул от 2-х до 10-х стран, под инпутом отображается список имен найденных стран.
Если бекенд вернул массив с одной страной, в интерфейсе рендерится разметка с данными о стране: название, столица, население, языки и флаг.

Запросы на бекенд происходят не по сабмиту формы, а при наборе имени страны в инпуте, то есть по событию input. Но делать HTTP-запрос при каждом нажатии клавиши нельзя, так как одновременно получится много HTTP-запросов которые будут выполняться в непредсказуемом порядке (race conditions). Поэтому на обработчик события необходимо применить подход debounce и делать HTTP-запрос спустя 500мс после того, как пользователь перестал вводить текст.
