(function () {
  // Sugerencias en https://github.com/TremendaCarucha/tremenda-lectura/issues/new
  const map = {
    'Ladri Depósito': ['Lali Espósito', 'Lali', 'Mariana Espósito', 'Mariana Lali Espósito'],
    'Depósito': ['Espósito'],
    'María BCRA': ['María Becerra', 'María de los Ángeles Becerra'],
    'BCRA': ['Becerra'],
    'Ñoqui Nicol': ['Nicki Nicole', 'Nicky Nicole'],
    'Bizaplan': ['Bizarrap'],
    'Sobre y los persas': ['Ciro y los persas'],
    'No te va un Plan': ['No te va a gustar'],
    'Las Pastillas de Perón': ['Las Pastillas del Abuelo'],
    'Fito Planes': ['Fito Paez'],
    'Emisión Mernes': ['Emilia Mernes'],
    'Ella mató un fiscal motorizado': ['Él Mató a un Policía Motorizado', 'EMAUPM', 'Él Mató'],
    'ABL': ['Abel'],
    'Roba Stereos': ['Soda Estereo'],
    'Dividendos': ['Divididos'],
    'La Mancha de Robando': ['La Mancha de Rolando'],
    'Malnadado': ['Maldonado'],
    'Tongolini': ['Mengolini'],
    'Massaraza': ['Massa'],
    'Larrata': ['Larreta'],
    'Saraza': ['Martín Guzmán'],
    'El Niño Rata': ['Pedro Rosemblat'],
  };

  const tildes = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u' };
  const tildesRegex = new RegExp(Object.keys(tildes).join('|'), 'g');

  for (const [real, fakes] of Object.entries(map)) {
     const str = fakes
      .sort((a, b) => b.length - a.length)
      .join('|')
      .toLowerCase()
      .replace(/ /g, '\\W+')
      .replace(tildesRegex, (char) => `[${char}${tildes[char]}]`);
    map[real] = new RegExp(`(^|\\b)${str}(\\b|$)`, 'ig');
  }

  function walkTextNodes(node, func) {
    if (node.nodeType === 3) {
      return func(node);
    }
    for (let child of node.childNodes) {
      walkTextNodes(child, func);
    }
  }

  walkTextNodes(document.body, function (node) {
    let content = node.textContent;
    for (const [real, fakes] of Object.entries(map)) {
      content = content.replace(fakes, real);
    }
    if (content !== node.textContent) {
      node.textContent = content;
    }
  })
})()