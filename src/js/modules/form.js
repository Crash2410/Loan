export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся!',
            failure: 'Что-то пошло не так...'
        };
        this.path = 'assets/question.php';
    }
    // Очистка инпутов
    clearInputs() {
        this.inputs.forEach(item => {
            item.value = '';
        });
    }
    // Валидация для поля с email
    checkMailInputs() {
        const mailInputs = document.querySelectorAll('[type="email"]');

        mailInputs.forEach(input => {
            input.addEventListener('keypress', function (e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }
    // Инициализация маски номера телефона
    initMask() {
        // Установка позиции курсора
        let setCursorPosition = (pos, elem) => {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
        // Маска для ввода номера телефона
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
            // Запрещаем пользователю удалять шаблон ввода номера
            if (def.length >= val.length) {
                val = def;
            }
            // Настройка заполнения шаблона вводимыми данными
            this.value = matrix.replace(/./g, function (a) {
                // Заменяем "__" в шаблоне на вводимые пользователем данные
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
            // Если маска пустая и пользователь нажал за поле ввода, то поле ввода номера очищается
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                /* Если пользователь ввел номер телефоне не полностью и нажал за заполе ввода
             и потом вернулся, курсор устанавливается в нужное место */
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll('[name="phone"]');

        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }
    // Отправка данных на сервер
    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    }

    // Инициализация
    init() {
        this.checkMailInputs();
        this.initMask();

        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Добавление блока с уведомлением о состоянии отправки данных
                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;
                // Формирование данных для отправки
                const formData = new FormData(form);
                // Отправка данных
                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                    });
            });
        });
    }
}