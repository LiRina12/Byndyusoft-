const googleUrl = 'https://www.google.com'
const inputGoogleId = '#APjFqb'
const byndyusoftUrl = 'https://byndyusoft.com/'
const telegramCorrectUrl = 'http://t.me/alexanderbyndyu'

describe('Проверка совпадения урла телеграмм, и сайта в поискойвой системе гугл', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://mc.yandex.ru/**', (req) => {
      req.reply({ statusCode: 200, body: '' });
    });
    cy.intercept('GET', 'https://googleads.g.doubleclick.net/**', (req) => {
      req.reply({ statusCode: 200, body: '' });
    });
  });

  it('Сайт успешно находится в гугле и имеет корректную ссылку', () => {
    cy.visit(googleUrl)
    
    cy.get(inputGoogleId)
      .type('Byndyusoft{enter}')
    
    cy.get('h3')
      .first()
      .parent('a')
      .should('have.attr', 'href', byndyusoftUrl);
  })

  it('Успешно находится блок с кнопкой, которая открывает модальное окно с ссылкой на телеграмм', () => {
    cy.visit(byndyusoftUrl)

    cy.get('.knowMore__container > .btn')
      .click()

    cy.get('.popup-callback__contacts-tg').should('have.attr', 'href', telegramCorrectUrl)
  })
})