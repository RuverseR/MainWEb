const sets = {
    1:  {'name': 'Macbeth Quotes', 'quotes': [
            {'quote': 'Fair is foul, and foul is fair.', 'info': ['Three Witches', 'Act 1 Scene 1']},
            {'quote': 'Present fears\nAre less than horrible imaginings.', 'info': ['King Duncan', 'Act 1 Scene 4']},
            {'quote': "There's daggers in men's smiles.", 'info': ['Donalbain', 'Act 2 Scene 3']},
            {'quote': 'False face must hide what the false heart doth know.', 'info': ['Macbeth', 'Act 1 Scene 7']},
            {'quote': 'I dare do all that may become a man;\nWho dares do more is none.', 'info': ['Macbeth', 'Act 1 Scene 7']}]
    },

    2:  {'name': 'An Inspector Calls Quotes', 'quotes': [
            {'quote': "You're squiffy.", 'info': ['Sheila', 'Act 1']},
            {'quote': "I speak as a hard headed businessman.", 'info': ['Mr Birling', 'Act 1']},
            {'quote': "Unsinkable, completely unsinkable.", 'info': ['Mr Birling', 'Act 1']},
            {'quote': "We really must stop these silly pretences.", 'info': ['Sheila', 'Act 2']},
            {'quote': "Girls of that class.", 'info': ['Mrs Birling', 'Act 2']},
            {'quote': "She was very pretty - soft brown hair.", 'info': ['Gerald', 'Act 2']},
            {'quote': "You're not the kind of father a chap could go to when he's in trouble.", 'info': ['Eric', 'Act 2']},
            {'quote': "We are members of one body. We are responsible for each other.", 'info': ['The Inspector', 'Act 3']},
            {'quote': "Everything's alright now Sheila.", 'info': ['Gerald', 'Act 3']},
            {'quote': "Each of you helped to kill her.", 'info': ['The Inspector', 'Act 3']}]
    },

    3: {"name": "Common Verbs - Set 1", "quotes": [
        {"quote": "accept", "info": ["aceptar"]},
        {"quote": "accompany", "info": ["acompañar"]},
        {"quote": "add", "info": ["añadir"]},
        {"quote": "advise", "info": ["aconsejar"]},
        {"quote": "allow", "info": ["permitir"]},
        {"quote": "answer / reply", "info": ["contestar / responder"]},
        {"quote": "apply", "info": ["dirigirse a / solicitar / aplicar"]},
        {"quote": "argue", "info": ["discutir"]},
        {"quote": "arrive", "info": ["llegar"]},
        {"quote": "ask", "info": ["preguntar"]},
        {"quote": "ask a question", "info": ["hacer una pregunta"]},
        {"quote": "ask for", "info": ["pedir"]},
        {"quote": "avoid", "info": ["evitar"]},
        {"quote": "bathe", "info": ["bañarse"]},
        {"quote": "be", "info": ["ser / estar"]},
        {"quote": "be able to", "info": ["poder", "ser capaz de"]},
        {"quote": "about to ( do )", "info": ["estar a punto de ( hacer )"]},
        {"quote": "be born", "info": ["nacer"]},
        {"quote": "be called", "info": ["llamarse"]},
        {"quote": "be careful", "info": ["tener cuidado"]},
        {"quote": "be hot / cold", "info": ["tener calor / frío"]},
        {"quote": "be hungry", "info": ["tener hambre"]},
        {"quote": "be in a hurry", "info": ["tener prisa"]},
        {"quote": "be interested in", "info": ["interesarse en"]},
        {"quote": "be keen to", "info": ["tener ganas de"]},
        {"quote": "be located", "info": ["encontrarse", "estar situado", "situarse"]},
        {"quote": "be lucky", "info": ["tener suerte"]},
        {"quote": "to be sleepy, tired", "info": ["tener sueño"]},
        {"quote": "be sorry", "info": ["sentir, lamentar"]},
        {"quote": "be successful", "info": ["tener éxito"]},
        {"quote": "be thirsty", "info": ["tener sed"]}]
    },

    4: {"name": "Numbers - Ordinals", "quotes": [
        {"quote": "first", "info": ["primer, primero/a"]},
        {"quote": "second", "info": ["segundo/a"]},
        {"quote": "third", "info": ["tercer, tercero/a"]},
        {"quote": "fourth", "info": ["cuarto/a"]},
        {"quote": "fifth", "info": ["quinto/a"]},
        {"quote": "sixth", "info": ["sexto/a"]},
        {"quote": "seventh", "info": ["séptimo/a"]},
        {"quote": "eighth", "info": ["octavo/a"]},
        {"quote": "ninth", "info": ["noveno/a"]},
        {"quote": "tenth", "info": ["décimo/a"]}]
    },

    5: {"name": "Numbers - From 1 to 2,000,000", "quotes": [
        {"quote": "1", "info": ["uno (un/una)"]},
        {"quote": "2", "info": ["dos"]},
        {"quote": "3", "info": ["tres"]},
        {"quote": "4", "info": ["cuatro"]},
        {"quote": "5", "info": ["cinco"]},
        {"quote": "6", "info": ["seis"]},
        {"quote": "7", "info": ["siete"]},
        {"quote": "8", "info": ["ocho"]},
        {"quote": "9", "info": ["nueve"]},
        {"quote": "10", "info": ["diez"]},
        {"quote": "11", "info": ["once"]},
        {"quote": "12", "info": ["doce"]},
        {"quote": "13", "info": ["trece"]},
        {"quote": "14", "info": ["catorce"]},
        {"quote": "15", "info": ["quince"]},
        {"quote": "16", "info": ["dieciséis"]},
        {"quote": "17", "info": ["diecisiete"]},
        {"quote": "18", "info": ["dieciocho"]},
        {"quote": "19", "info": ["diecinueve"]},
        {"quote": "20", "info": ["veinte"]},
        {"quote": "21", "info": ["veintiuno"]},
        {"quote": "22", "info": ["veintidós"]},
        {"quote": "23", "info": ["veintitrés"]},
        {"quote": "24", "info": ["veinticuatro"]},
        {"quote": "25", "info": ["veinticinco"]},
        {"quote": "26", "info": ["veintiséis"]},
        {"quote": "27", "info": ["veintisiete"]},
        {"quote": "28", "info": ["veintiocho"]},
        {"quote": "29", "info": ["veintinueve"]},
        {"quote": "30", "info": ["treinta"]},
        {"quote": "31", "info": ["treinta y uno (un/una)"]},
        {"quote": "32", "info": ["treinta y dos"]},
        {"quote": "40", "info": ["cuarenta"]},
        {"quote": "50", "info": ["cincuenta"]},
        {"quote": "60", "info": ["sesenta"]},
        {"quote": "70", "info": ["setenta"]},
        {"quote": "80", "info": ["ochenta"]},
        {"quote": "90", "info": ["noventa"]},
        {"quote": "100", "info": ["cien, ciento"]},
        {"quote": "101", "info": ["ciento uno"]},
        {"quote": "102", "info": ["ciento dos"]},
        {"quote": "120", "info": ["ciento veinte"]},
        {"quote": "200", "info": ["doscientos"]},
        {"quote": "201", "info": ["doscientos uno"]},
        {"quote": "300", "info": ["trescientos"]},
        {"quote": "400", "info": ["cuatrocientos"]},
        {"quote": "500", "info": ["quinientos"]},
        {"quote": "600", "info": ["seiscientos"]},
        {"quote": "700", "info": ["setecientos"]},
        {"quote": "800", "info": ["ochocientos"]},
        {"quote": "900", "info": ["novecientos"]},
        {"quote": "1000", "info": ["mil"]},
        {"quote": "1001", "info": ["mil uno"]},
        {"quote": "1100", "info": ["mil cien(to)"]},
        {"quote": "2000", "info": ["dos mil"]},
        {"quote": "100,000", "info": ["cien mil"]},
        {"quote": "200,000", "info": ["doscientos mil"]},
        {"quote": "1,000,000", "info": ["millión, un millión de"]},
        {"quote": "2,000,000", "info": ["dos milliones (de)"]}]
    },

    6: {"name": "Common Adverbs", "quotes": [
        {"quote": "again", "info": ["otra vez, de nuevo"]},
        {"quote": "(for a) long time", "info": ["(por) mucho tiempo"]},
        {"quote": "almost", "info": ["casi"]},
        {"quote": "already", "info": ["ya"]},
        {"quote": "always", "info": ["siempre"]},
        {"quote": "badly", "info": ["mal"]},
        {"quote": "below (down)", "info": ["abajo"]},
        {"quote": "especially", "info": ["especialmente, sobre todo"]},
        {"quote": "fortunately", "info": ["afortunadamente, por suerte"]},
        {"quote": "here", "info": ["aquí"]},
        {"quote": "immediately", "info": ["inmediatamente"]},
        {"quote": "more", "info": ["más"]},
        {"quote": "nevertheless", "info": ["no obstante, sin embargo"]},
        {"quote": "often", "info": ["a menudo"]},
        {"quote": "over there", "info": ["ahí"]},
        {"quote": "perhaps", "info": ["quizás / quizá"]},
        {"quote": "quickly", "info": ["rápidamente"]},
        {"quote": "hurriedly", "info": ["de prisa"]},
        {"quote": "rather / quite", "info": ["bastante"]},
        {"quote": "really", "info": ["realmente"]},
        {"quote": "recently", "info": ["recientemente"]},
        {"quote": "sometimes", "info": ["a veces"]},
        {"quote": "still", "info": ["todavía"]},
        {"quote": "straight away", "info": ["en seguida"]},
        {"quote": "there", "info": ["allí"]},
        {"quote": "too", "info": ["demasiado"]},
        {"quote": "unfortunately", "info": ["desgraciadamente, desafortunadamente, por desgracia"]},
        {"quote": "up there", "info": ["arriba"]},
        {"quote": "very", "info": ["muy"]},
        {"quote": "well", "info": ["bien"]}]
    },
}