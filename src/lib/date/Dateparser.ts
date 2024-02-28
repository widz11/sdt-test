/**
 * Class Dateparser
 */
export class Dateparser {
	/**
	 *
	 * @param date
	 */
	static databaseFormat(date: Date = new Date()): string {
		return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
			-2
		)}-${("0" + date.getDate()).slice(-2)} ${
			("0" + date.getHours()).slice(-2) +
			":" +
			("0" + date.getMinutes()).slice(-2) +
			":" +
			("0" + date.getSeconds()).slice(-2)
		}`;
	}

    /**
     * 
     * @returns
     */
	static unixNow() {
		return Math.floor(Date.now() / 1000);
	}

	/**
	 *
	 * @param unix
	 */
	static unixToDateTime(unix: any) {
		return new Date(unix * 1000);
	}

    /**
	 * @param date Date
	 * @param hour integer
     * @returns
	 */
	static addHours(date: Date, hour: number = 0): Date {
		const dateCopy = new Date(date.getTime());
		dateCopy.setHours(date.getHours() + hour);
		return dateCopy;
	}

	/**
	 *
	 * @param date
	 * @param hour
	 */
	static subHours(date: Date, hour = 1): Date {
		const dateCopy = new Date(date.getTime());
		dateCopy.setHours(date.getHours() - hour);
		return dateCopy;
	}

	/**
     * 
     * @param date 
     * @param format 
     * @returns 
     */
    static formatDate(date: Date, format: string) {
        // Init
        let result = ''

        // Format
        if(format && date) {
            for(let index = 0; index < format.length; index++) {
                switch (format[index]) {
                    case 'Y':
                        result += `${date.getFullYear()}`                  
                        break
                    case 'm':
                        result += `${("0"+(date.getMonth()+1)).slice(-2)}`               
                        break
                    case 'd':
                        result += `${("0" + date.getDate()).slice(-2)}`
                        break
                    case 'H':
                        result += `${("0" + date.getHours()).slice(-2)}`
                        break
                    case 'i':
                        result += `${("0" + date.getMinutes()).slice(-2)}`
                        break
                    case 's':
                        result += `${("0" + date.getSeconds()).slice(-2)}`
                        break
                    case ' ':
                        result += ' '
                        break
                    case '-':
                        result += '-'
                        break
                    case '/':
                        result += '/'
                        break
                    case ':':
                        result += ':'
                        break
                    default:
                        break;
                }
                
            }
        }

        return result
    }
}
