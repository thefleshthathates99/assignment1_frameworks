//////////////////////////////////////chat Component in chat.component.ts/////////////////////////////////////////////////

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()  //Initialise socket connection, pushing messages if they exist
      .subscribe((message:string) => {
        this.messages.push(message);
      });
  }

  private chat(){
    if(this.messagecontent){
      this.socketService.send(this.messagecontent);
      this.messagecontent = null;                   //Sends message and update message on page
    }else{
      console.log("no message");
    }
  }

//////////////////////////////////////chat Component in sockdet.service.ts/////////////////////////////////////////////////

  public initSocket(): void {
    this.socket = io(SERVER_URL); //Initialise Socket.Io on the Server (Localhost:3000)
  }

  public send(message: string): void {
    this.socket.emit('message', message); //Sends message to socket room
  }

  public onMessage(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('message', (data:string) => observer.next(data)); //Returns current messages
    });
    return observable;
  }