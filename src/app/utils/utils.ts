export class Utils {

    public formatDate(input: any) {
        return [input.year, input.month.toString().padStart(2, '0'), input.day.toString().padStart(2, '0')].join('-');
    }
}
