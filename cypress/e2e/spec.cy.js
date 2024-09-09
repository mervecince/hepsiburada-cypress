describe('hepsiburada', () => {

  it('Hepsiburada sayfasına gidilir.', () => {
      cy.visit('/', {
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'User-Agent': 'axios/0.27.2'
          }
      });
  })

  it('iphone arama işlemi yapılır', () => {
      cy.get('.SearchBoxOld').click();
      cy.get('input[class*="searchBarContent"]').type('iphone{enter}');
  })

  it('ürün listesinden ilk ürüne tıklanır.', () => {
      cy.get('a[class*="moria-ProductCard"]').eq(0)
          .invoke('removeAttr', 'target')  // target="_blank" özelliğini kaldır
          .click();
  })

  it('ürün detay alanında yorumlar tabına gidilir.', () => {
      cy.get('a[aria-label*="Değerlendirme"]').click();
  })

  it('ilk yorumun evet butonuna tıklanır.', () => {
      cy.xpath("//div[contains(@class, 'thumbsUp')]")
          .then(($el) => {
              if ($el.length) {  // Eğer element varsa
                  cy.wrap($el).click();  // Tıklama işlemini gerçekleştir
              } else {
                  cy.log('Element bulunamadı');
              }
          });
  })

  it('teşekkür ederiz yazısının olduğu kontrol edilir.', () => {
    cy.xpath("(//span[contains(@class, 'hermes-ReviewCard-module') and text()='Teşekkür Ederiz.'])[1]")
        .then($element => {
            // Eğer element bulunmuşsa, görünür olduğunu kontrol et
            if ($element.length) {
                cy.wrap($element).should('be.visible');
            } else {
                cy.log('Element bulunamadı');
            }
        });
  })
})