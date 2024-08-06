interface structure {
    reload(button: HTMLButtonElement): any,
}

class pageReload implements Required<Pick<structure, 'reload'>> {
    public static instance: any = new pageReload().reload();
    private constructor(){}

    reload(button: HTMLButtonElement = document.querySelector('button') as HTMLButtonElement) {
       if(!(button === null)){
            button.addEventListener('click', (event: any) => {
                window.setTimeout(() => window.location.reload(), 10 as number)
            });
            return;   
       } else return;
    }
}  

pageReload.instance