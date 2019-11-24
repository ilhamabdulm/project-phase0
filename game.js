
var klik=new Audio()
klik.src="assets/klik.wav"
var win=new Audio()
win.src="assets/tada.wav"

var pemain = "X"
var board = []
var z=0

var keterangan = document.getElementById('keterangan')
keterangan.innerHTML="Your Turn!"

// dapetin nama hasil inputan user
var nama = ''
function getName(){
    if(document.getElementById('name').value == ''){
        alert('Nama harus diisi')
        return
    }
    document.getElementById('container').style.display = 'block'
    nama = document.getElementById('name').value
    document.getElementById('play2').innerHTML="Hello!! " + nama
    document.getElementById('welcome').style.display = 'none'
    return
}
//balik ke halaman depan
function closeGame(){
    document.getElementById('container').style.display = 'none'
    document.getElementById('name').value = ''
    document.getElementById('welcome').style.display = 'block'
    return
}

// untuk restart tanpa reload page
function restartButton(){
    klik.play()
    for(let i=1; i<=9; i++){
        document.getElementById('btn-'+i+'D').innerHTML=''
        document.getElementById('btn-'+i+'D').value=''
        document.getElementById('btn-'+i+'D').style['background-color']='rgba(255, 255, 255, 0.301)'
        document.getElementById('btn-'+i+'D').disabled = ''
        winner = false
    }
    pemain = 'X'
    keterangan.innerHTML="Your Turn!"
    board = []
    z=0
    empty = 9
}
var empty = 9;

// fungsi komputer, masih cupu sih ini tapi
function comp(x){
    let num = Math.floor(Math.random()*(10-1)+1)
    let ai = document.getElementById('btn-'+num+'D')

    if(board[num-1]=='' || board[num-1]=='X' || board[num-1]=='O' || num==x){
        comp()
    }else{
        console.log(num)
        ai.innerHTML='O'
        ai.value='O'
        ai.style['background-color']='transparent'
        ai.disabled='disabled'
        board[num-1] = 'O'
        cekPemenang()
        empty--
    }
    if(empty==0){
        cekPemenang()
        gameTie()
    }
}

// fungsi saat klik jalanin komputer juga
function kliktombol(x){
    klik.play()
    let player = document.getElementById('btn-'+x+'D')
    player.innerHTML=pemain
    player.value=pemain
    player.style['background-color']='transparent'
    player.disabled='disabled'
    board[x-1] = 'X'
    cekPemenang()
    empty--
    comp(x)

    return
}

// cek pemenang dan tentuin
var winner = ''
function cekPemenang(){
    if( board[0]==pemain &&
        board[1]==pemain &&
        board[2]==pemain ||
        board[0]=='O' &&
        board[1]=='O' &&
        board[2]=='O'
    ) {
        winner = board[0]
        menang(1,2,3)
    }else if( 
        board[3]==pemain &&
        board[4]==pemain &&
        board[5]==pemain ||
        board[3]=='O' &&
        board[4]=='O' &&
        board[5]=='O'
    ){
        winner = board[3]
        menang(4,5,6)
    }else if( 
        board[6]==pemain &&
        board[7]==pemain &&
        board[8]==pemain ||
        board[6]=='O' &&
        board[7]=='O' &&
        board[8]=='O'
    ){
        winner = board[6]
        menang(7,8,9)
    }else if( 
        board[0]==pemain &&
        board[3]==pemain &&
        board[6]==pemain ||
        board[0]=='O' &&
        board[3]=='O' &&
        board[6]=='O'
    ){
        winner = board[0]
        menang(1,4,7)
    }else if( 
        board[1]==pemain &&
        board[4]==pemain &&
        board[7]==pemain ||
        board[1]=='O' &&
        board[4]=='O' &&
        board[7]=='O'
    ){
        winner = board[1]
        menang(2,5,8)
    }else if( 
        board[2]==pemain &&
        board[5]==pemain &&
        board[8]==pemain ||
        board[2]=='O' &&
        board[5]=='O' &&
        board[8]=='O'
    ){
        winner = board[2]
        menang(3,6,9)
    }else if( 
        board[0]==pemain &&
        board[4]==pemain &&
        board[8]==pemain ||
        board[0]=='O' &&
        board[4]=='O' &&
        board[8]=='O'
    ){
        winner = board[0]
        menang(1,5,9)
    }else if( 
        board[2]==pemain &&
        board[4]==pemain &&
        board[6]==pemain ||
        board[2]=='O' &&
        board[4]=='O' &&
        board[6]=='O'
    ){
        winner = board[2]
        menang(3,5,7)
    }else{
        gameTie()
    }
    return
}

//Tie game
function gameTie(){
    if(empty==0){
        document.getElementById('keterangan').innerHTML="TIE GAME!"
        for(let i=1; i<=board.length; i++){
            document.getElementById('btn-'+i+'D').style.background="red"
        }
        win.play()

    }
}

//Jika ada pemenang
function menang(a,b,c){
    win.play();
    if(winner=='X'){
        keterangan.innerHTML="Yey! YOU WIN!!"
    }else{
        keterangan.innerHTML="COMPUTER WIN!"
    }
    for(let i=1;i<10;i++){
        document.getElementById('btn-'+i+'D').disabled='disabled'
    }
    document.getElementById('btn-'+a+'D').style.background="green"
    document.getElementById('btn-'+b+'D').style.background="green"
    document.getElementById('btn-'+c+'D').style.background="green"
    return
}