// ===== Project Summer 2026 =====

// ===============================
// 400コマ進捗
// ===============================

const commentText =
document.getElementById("commentText");
const goal = document.getElementById("goal");
const today = document.getElementById("today");
const total = document.getElementById("total");

const todayBar = document.getElementById("todayBar");
const totalBar = document.getElementById("totalBar");

const totalText = document.getElementById("totalText");

const remainText = document.getElementById("remainText");
const daysRemainText = document.getElementById("daysRemainText");
const averageText = document.getElementById("averageText");
const percentText = document.getElementById("percentText");
const recordBtn = document.getElementById("recordBtn");



// ------------------------------
// 保存データ
// ------------------------------

const savedTotal = localStorage.getItem("total");

if(savedTotal !== null){

    total.value = savedTotal;

}



// ------------------------------
// 日付
// ------------------------------

const startDate = new Date("2026-07-18");
startDate.setHours(0,0,0,0);

const endDate = new Date("2026-08-27");
endDate.setHours(0,0,0,0);

const now = new Date();
now.setHours(0,0,0,0);

const oneDay = 1000 * 60 * 60 * 24;

const passedDays =
Math.floor((now - startDate) / oneDay) + 1;

const remainingDays =
Math.ceil((endDate - now) / oneDay);

document.getElementById("daysLeft").textContent =
"🔥 あと"+remainingDays+"日";

document.getElementById("dayCount").textContent =
"Day "+passedDays+" / 40";

document.getElementById("todayDate").textContent =
now.getFullYear()+"/"+
(now.getMonth()+1)+"/"+
now.getDate();



// ------------------------------
// バー更新
// ------------------------------

function updateBars(){

    todayBar.max = Number(goal.value);

    todayBar.value = Number(today.value);

    totalBar.value = Number(total.value);

    totalText.textContent =
    total.value + " / 400 コマ";

    updateForecast();

}



// ------------------------------
// 学習予測
// ------------------------------

function updateForecast(){

    const remain =
    400 - Number(total.value);

    remainText.textContent =
    "残り："+remain+"コマ";

    daysRemainText.textContent =
    "残り日数："+remainingDays+"日";

    let average = 0;

    if(remainingDays>0){

        average =
        (remain/remainingDays).toFixed(1);

    }

    averageText.textContent =
    "1日平均："+average+"コマ必要";

    const percent =
    Math.round(Number(total.value)/400*100);

    percentText.textContent =
    "達成率："+percent+"%";



   if(Number(total.value) >= 400){

    commentText.textContent =
    "🏆400コマ達成！";

}
else if(average <= 8){

    commentText.textContent =
    "🟢順調です！";

}
else if(average <= 10){

    commentText.textContent =
    "🟡あと少し頑張ろう！";

}
else{

    commentText.textContent =
    "🔴ペースアップしよう！";

}

}



// ------------------------------
// 入力
// ------------------------------

goal.addEventListener("input",updateBars);

today.addEventListener("input",updateBars);



// ------------------------------
// 記録
// ------------------------------

recordBtn.addEventListener("click",function(){

    total.value =
    Number(total.value)+
    Number(today.value);

    localStorage.setItem(
        "total",
        total.value
    );

    today.value = 0;

    updateBars();

});



// ------------------------------
// 初回表示
// ------------------------------

updateBars();

/// ===============================
// ToDo機能
// ===============================

const addTodoBtn =
document.getElementById("addTodoBtn");

const todoList =
document.getElementById("todoList");

const todoBar =
document.getElementById("todoBar");

const todoRate =
document.getElementById("todoRate");

const todoComment =
document.getElementById("todoComment");

let todos =
JSON.parse(localStorage.getItem("todos"));

if(!todos){

    todos = [];

}

function saveTodos(){

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

}

function updateTodoRate(){

    const totalCount =
    todos.length;

    const doneCount =
    todos.filter(function(todo){

        return todo.checked;

    }).length;

    const percent =
    totalCount === 0
    ? 0
    : Math.round(
        doneCount / totalCount * 100
    );

    todoRate.textContent =
    "達成率 " + percent + "%";

    todoBar.value = percent;


    if(totalCount === 0){

        todoComment.textContent =
        "📝予定を追加しよう！";

    }
    else if(percent === 100){

        todoComment.textContent =
        "🏆今日の予定達成！";

    }
    else if(percent >= 70){

        todoComment.textContent =
        "🟢順調！";

    }
    else if(percent >= 40){

        todoComment.textContent =
        "🟡あと少し！";

    }
    else{

        todoComment.textContent =
        "🔴ベースアップしよう！";

    }

}

function renderTodos(){

    todoList.innerHTML = "";

    todos.forEach(function(todo,index){

        const item =
        document.createElement("p");

        item.innerHTML =
        '<input type="checkbox" class="todoCheck"> '+
        '<input type="text" class="todoText"> '+
        '<button class="deleteTodo">✖</button>';

        const check =
        item.querySelector(".todoCheck");

        const text =
        item.querySelector(".todoText");

        const del =
        item.querySelector(".deleteTodo");

        check.checked =
        todo.checked;

        text.value =
        todo.text;

        check.addEventListener(
            "change",
            function(){

                todos[index].checked =
                check.checked;

                saveTodos();

                updateTodoRate();

            }
        );

        text.addEventListener(
            "input",
            function(){

                todos[index].text =
                text.value;

                saveTodos();

            }
        );

        del.addEventListener(
            "click",
            function(){

                todos.splice(index,1);

                saveTodos();

                renderTodos();

            }
        );

        todoList.appendChild(item);

    });

    updateTodoRate();

}

addTodoBtn.addEventListener(
    "click",
    function(){

        todos.push({

            text:"新しい予定",

            checked:false

        });

        saveTodos();

        renderTodos();

    }
);

renderTodos();

// ===============================
// Part C
// 提出物・テスト・模試
// ===============================

const addExamBtn =
document.getElementById("addExamBtn");

const examList =
document.getElementById("examList");

let exams =
JSON.parse(localStorage.getItem("exams"));

if(!exams){

    exams = [];

}

function saveExams(){

    localStorage.setItem(
        "exams",
        JSON.stringify(exams)
    );

}

function renderExams(){

    examList.innerHTML = "";

    exams.sort(function(a,b){

        if(a.date==="" && b.date==="") return 0;
        if(a.date==="") return 1;
        if(b.date==="") return -1;

        return new Date(a.date)-new Date(b.date);

    });

    exams.forEach(function(exam,index){

        const item =
        document.createElement("p");

        item.innerHTML =

        '<select class="examType">'+
        '<option value="提出物">📄提出物</option>'+
        '<option value="テスト">📝テスト</option>'+
        '<option value="模試">📊模試</option>'+
        '</select> '+

        '<input type="date" class="examDate"> '+

        '<input type="text" class="examText" placeholder="内容"> '+

        '<input type="checkbox" class="examDone"> 完了 '+

        '<span class="examRemain"></span> '+

        '<button class="deleteExam">✖</button>';



        const type =
        item.querySelector(".examType");

        const date =
        item.querySelector(".examDate");

        const text =
        item.querySelector(".examText");

        const done =
        item.querySelector(".examDone");

        const remain =
        item.querySelector(".examRemain");

        const del =
        item.querySelector(".deleteExam");



        type.value =
        exam.type;

        date.value =
        exam.date;

        text.value =
        exam.text;

        done.checked =
        exam.done;



        if(exam.date){

            const today =
            new Date();

            today.setHours(0,0,0,0);

            const examDate =
            new Date(exam.date);

            const diff =
            Math.ceil(
                (examDate-today)/
                (1000*60*60*24)
            );

            if(diff>0){

                remain.textContent =
                " あと"+diff+"日";

            }

            else if(diff===0){

                remain.textContent =
                " 今日";

            }

            else{

                remain.textContent =
                " 終了";

            }

        }



        type.addEventListener("change",function(){

            exams[index].type =
            type.value;

            saveExams();

        });



        date.addEventListener("change",function(){

            exams[index].date =
            date.value;

            saveExams();

            renderExams();

        });



        text.addEventListener("input",function(){

            exams[index].text =
            text.value;

            saveExams();

        });



        done.addEventListener("change",function(){

            exams[index].done =
            done.checked;

            saveExams();

        });



        del.addEventListener("click",function(){

            exams.splice(index,1);

            saveExams();

            renderExams();

        });

        examList.appendChild(item);

    });

}



addExamBtn.addEventListener("click",function(){

    exams.push({

        type:"提出物",

        date:"",

        text:"",

        done:false

    });

    saveExams();

    renderExams();

});

renderExams();

// ===============================
// Part D
// 教材管理
// ===============================

const addMaterialBtn =
document.getElementById("addMaterialBtn");

const materialList =
document.getElementById("materialList");

let materials =
JSON.parse(localStorage.getItem("materials"));

if(!materials){

    materials = [
        {
            text:"新ワーク",
            checked:false
        },
        {
            text:"整理と対策",
            checked:false
        },
        {
            text:"教科書",
            checked:false
        }
    ];

}

function saveMaterials(){

    localStorage.setItem(
        "materials",
        JSON.stringify(materials)
    );

}

function renderMaterials(){

    materialList.innerHTML = "";

    materials.forEach(function(material,index){

        const item =
        document.createElement("p");

        item.innerHTML =
        '<input type="checkbox" class="materialCheck"> '+
        '<input type="text" class="materialText"> '+
        '<button class="deleteMaterial">✖</button>';

        const check =
        item.querySelector(".materialCheck");

        const text =
        item.querySelector(".materialText");

        const del =
        item.querySelector(".deleteMaterial");

        check.checked =
        material.checked;

        text.value =
        material.text;



        check.addEventListener("change",function(){

            materials[index].checked =
            check.checked;

            saveMaterials();

        });



        text.addEventListener("input",function(){

            materials[index].text =
            text.value;

            saveMaterials();

        });



        del.addEventListener("click",function(){

            materials.splice(index,1);

            saveMaterials();

            renderMaterials();

        });



        materialList.appendChild(item);

    });

}



addMaterialBtn.addEventListener("click",function(){

    materials.push({

        text:"新しい教材",

        checked:false

    });

    saveMaterials();

    renderMaterials();

});

renderMaterials();

// ===============================
// 自動保存
// ===============================

const goalText =
document.getElementById("goalText");

const messageText =
document.getElementById("messageText");

const resultText =
document.getElementById("resultText");


// 読み込み
goalText.value =
localStorage.getItem("goalText") || "";

messageText.value =
localStorage.getItem("messageText") || "";

resultText.value =
localStorage.getItem("resultText") || "";


// 保存
goalText.addEventListener("input", function(){

    localStorage.setItem(
        "goalText",
        goalText.value
    );

});

messageText.addEventListener("input", function(){

    localStorage.setItem(
        "messageText",
        messageText.value
    );

});

resultText.addEventListener("input", function(){

    localStorage.setItem(
        "resultText",
        resultText.value
    );

});

// ===============================
// 学習以外の予定 保存
// ===============================

const otherSchedule =
document.getElementById("otherSchedule");

const savedOtherSchedule =
localStorage.getItem("otherSchedule");

if(savedOtherSchedule){

    otherSchedule.value =
    savedOtherSchedule;

}

otherSchedule.addEventListener(
    "input",
    function(){

        localStorage.setItem(
            "otherSchedule",
            otherSchedule.value
        );

    }
);
