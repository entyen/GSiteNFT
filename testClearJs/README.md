## Скрипты необходимые для работы
web3.min.js = Скрипт для подключение к сети WEB3

web3-provider.min.js = Скрит для работы с WalletConnect Через WEB3 Provider

gnft_abi.js = Массив с методами смарт контракта для взаимодействия с ним


## Алгоритм действий

1. Пользователь заходит на страницу нажимает на кнопку получает Модальное Окно с QR Кодом и Выбором Приложения для Авторизации
2. После сканирования QR Кода либо авторизации через выбранное приложение Кошелька происходит запрос доступа в кошелек пользователя
3. Он подтверждает запрос на устройстве через которое производил авторизацию
4. После получения номера кошелька код производит поиск NFT-шек пользователя внутри контракта используя метод встроенный в контракт по номеру кошелька.
5. Потом происходит запрос JSON файлов полученных NFT через Сайт ipfs.io
6. Далее следует сортировка JSON файлов NFT-шек по проценту скидки
7. Выводиться NFT с наибольшим процентом скидки и его ID