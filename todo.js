const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
    const btn = event.target; // 클릭한 이벤트 지칭
    const li = btn.parentNode;  // 부모 노드 선택 (자식, 이전형제, 다음형제)
    toDoList.removeChild(li); // 자식노드 삭제
    const cleanToDos = toDos.filter(function(toDo){ 
        // filter의 역할 : true(1) 인 것들을 return(반환) 시키는 역할 또는 그 반대
        // 여기서는 toDo.id 가 li.id 와 다른 것들을 반환시키고 있다.
        return toDo.id !== parseInt(li.id); // li.id 가 string 이기 때문에 숫자로 변환시켜주어야 한다.
    }); 
    // console.log(cleanToDos);
    // 여기까지 실행시켜보면? cleanToDos 는 3개, toDos 는 4개로 일치하지 않음
    toDos = cleanToDos // const toDos = []; 를 let으로 교체해야 한다.
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li"); // 요소생성 (createTextNode: 선택한 요소에 텍스트, 즉 문자열을 추가)
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;

    li.appendChild(span);   // 자식노드 추가
    li.appendChild(delBtn);
    li.id =  newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };

    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos); // 파싱 : 알아보기 쉽게
        parsedToDos.forEach(function(toDo) { // forEach : 한번씩 전부 실행시키기
            paintToDo(toDo.text);
        });
    }
 } 



function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();