module.exports = {
    capitalize: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },

    sqlErrorHumanization: function(code, sqlMessage) {
        switch(code) {
            case 'ER_BAD_NULL_ERROR':
                return 'Обязательное поле не заполнено. Проверьте ввод данных и попопробуйте еще.';
            case 'ER_DUP_ENTRY':
                return 'Такая запись у нас уже есть.';
            default:
                return 'Неопознанная ошибка. Жизнь полна сюрпризов!'
        }
    }, 


    errorNotification: function(app, error) {
        app.notification.create({
            icon: '<img src="/favicon-32.png" width="20" height="20" />',
            title: 'Левша',
            titleRightText: 'только что',
            subtitle: 'Ошибка сервера. Не беда, сейчас поправим!',
            text: 'Попробуйте позже. Нажмите чтобы закрыть.',
            closeOnClick: true,
        }).open()
    },
}