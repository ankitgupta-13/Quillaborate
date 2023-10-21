class Helper {
    static validateForm = async (payload, allowEmpty) => {
        await Promise.all(Object.keys(payload).map(async key => {
            if(allowEmpty){
                if(payload[key] === null || payload[key] === undefined || payload[key] === "Invalid date"){
                    await delete payload[key]
                }
            }else{
                if(payload[key] === null || payload[key] === undefined || payload[key] === "Invalid date" || payload[key] === ""){
                    await delete payload[key]
                }
            }
            if(key==='allow_mobile_int' || key==='allow_web_int' || key==='created_by_var' || key==='created_on_dtm' || key==='id_seq' || key==='last_login_on_dtm' || key==='status_int' || key==='updated_by_var' || key==='updated_on_dtm' || key==='user_group_id_int' || key==='password_var'){
                await delete payload[key]
            }
        }))

        return payload
    }

    static capitalEachWord = (letter) => {
        try {
            var separateWord = letter.toLowerCase().split(' ');
            for (var i = 0; i < separateWord.length; i++) {
               separateWord[i] = separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
            }
            return separateWord.join(' ');
        } catch (error) {
            return letter
        }
    }
}

export default Helper