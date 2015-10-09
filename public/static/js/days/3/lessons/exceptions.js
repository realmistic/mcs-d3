var exeptions = [
	/^сво((и[хм])|(его)|(ей)|й)$/,
	/^сказа((ть)|(л)|(ли))$/,
	/^которы*/,
	/^мож((ет)|(но))/,
	'когда', 'между',
	'только', 'нибудь',
	'перед', 'такой', 'среди',
	'всякий', 'теперь',
	'чтобы', 'какой', 'тогда', 'долго',
	'здесь', 'больше', 'будет',
	'также', 'этого', 'пусть', 'вдруг'
]

var equals = [
	{ reg: /^козак*/, to: 'козак' },
	{ reg: /(тарас)|(бульба)/, to: 'тарас бульба' },
	{ reg: /голов*/, to: 'голова' },
	{ reg: /^андри*/, to: 'андрий' },
	{ reg: /^сын[окуаы]*/, to: 'сын' },
	{ reg: /^остап*/, to: 'остап' },
	{ reg: /^лях/, to: 'ляхи'},
	{ reg: /^запорож*/, to: 'запорожье'},
	{ reg: /^од((но?у?г?о?)|(ин))/, to: 'один'},
	{ reg: /^киев*/, to: 'киев'}
];