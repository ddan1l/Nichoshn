export default  {
    methods: {
        transliterate(str){
            let space = '-';
            let link = '';
            let transl = {
                'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
                'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
                'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
                'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': '',
                'ы': 'y', 'ь': '' , 'э': 'e', 'ю': 'yu', 'я': 'ya'
            }
            if (str !== '')
                str = str.toLowerCase();
            for (let i = 0; i < str.length; i++){
                if (/[а-яё]/.test(str.charAt(i))){
                    link += transl[str.charAt(i)];
                } else if (/[a-z0-9]/.test(str.charAt(i))){
                    link += str.charAt(i);
                } else {
                    if (link.slice(-1) !== space) link += space;
                }
            }
            return link
        }
    }
}
