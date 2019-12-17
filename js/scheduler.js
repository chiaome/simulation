var queue = new PriorityQueue({ comparator: function(a, b) { return b.priority - a.priority; }});
var completedQueue = new Array();

var gloablID = 0;

var userScheduler = function (serverCluster) {
    
}

function Job(val) {
    this.id = generateUUID();
    // the size of job
    this.val = val;
    // the time when the job is generated
    this.generateTime = getCurrentTime();
    // the time when the job enters the cluster
    this.processTime = -1;
    // the time when the job is done
    this.completedTime = -1;
    this.priority = id;
}

function Task(job, nodeNum) {
    this.job = job;
    this.nodeNum = nodeNun;
}


function ServerCluster(nodeNum) {
    // total number of nodes
    this.totalNum = nodeNum;
    // the current available number of server nodes
    this.availableNum = nodeNum;
    // the current task list the the cluster is processing
    this.taskList = [];
    this.checkAvailableNum = function () {
        return this.availableNum;
    }
    this.printCurrentStatus = function () {
        // colorLog("******************", "info");
        // colorLog("availableNum: " + this.availableNum.toString() + " listNum: " + this.taskList.length.toString(), "warning");
    }
    this.releaseTask = function(task) {
        var i;
        // remove task from the list
        for(i = 0; i < this.taskList.length; i++) {
            if(this.taskList[i].id == task.id) {
                break;
            }
        }
        return this.releaseTaskByIndex(i);
    }
    this.releaseTaskByIndex = function (i) {
        if(this.taskList.length == 0) {
            return null;
        }
        var currentTime = getCurrentTime();
        var task = this.taskList[i];
        this.taskList[i] = this.taskList[0];
        this.taskList.shift();
        // change the availableNum
        this.availableNum += task.nodeNum;
        // calculate the val of the task
        task.val -= (currentTime - task.processTime) * task.nodeNum;
        if(task.val <= 0) {
            task.val = 0;
            task.completedTime = Math.ceil((task.val) /  task.nodeNum) + task.processTime;
        }else {
            task.processTime = currentTime;
        }
        return task;
    }
    // get the task that has the cloestest nodeNum
    this.getSimilarTask = function(nodeNum) {
        this.taskList.sort(function (a, b) {
            return b.nodeNum - a.nodeNum;
        });
        var i = 0;
        for(i = 0; i < this.taskList.length; i++) {
            if(this.taskList[i].nodeNum < nodeNum) break;
        }
        i -= 1;
        if(i < 0) i = 0;
        return this.taskList[i];
    }
    // Switch from processing one job to processing another
    this.preemption = function (nodeNum) {
        // colorLog("preemption: " + this.availableNum.toString() + ", " + nodeNum.toString(), "warning");
        while(nodeNum > 0) {
            var task = this.getSimilarTask(nodeNum);
            this.releaseTask(task);
            nodeNum -= task.nodeNum;
            if(task.val > 0) {
                queue.queue(task);
            }else {
                colorLog("Completed: " + task.id + " Response Times: " + (task.completedTime - task.generateTime), "success");
                completedQueue.push(task);
            }
        }
    }
    // add a task into cluster
    this.process = function (task) {
        // console.log("Processing task " + task.id);
        this.availableNum -= task.nodeNum;
        task.processTime = getCurrentTime();
        this.taskList.push(task);
        // console.log(this.availableNum);
    }
    // check each tasks in the current tasks list, if the task is done, put it into completed queue
    this.checkAllTasks = function() {
        var currentTime = getCurrentTime();
        var currentIndex = -1;
        for(var i = 0; i < this.taskList.length; i++) {
            var task = this.taskList[i];
            if(task.val <= (currentTime - task.processTime) * task.nodeNum) {
                if(currentIndex == -1) currentIndex = i;
            }
            // console.log(this.taskList.length);
        }
        if(currentIndex != -1) {
            task = this.releaseTaskByIndex(currentIndex);
            completedQueue.push(task);
            colorLog("Completed: " + task.id + " Response Times: " + (task.completedTime - task.generateTime), "success");
            return;
        }
    }
}

// ------------   Queue ------------

function mockTask(num) {
    for(var i = 0; i < num; i++) {
        queue.queue(new Task(getRandomNum(3), getRandomNum(140), getRandomNum(5) * 1000));
    }
}

function printQueue() {
    while(queue.length) {
        console.log(queue.dequeue());
    }
}



// --------------- Test ----------------
var totalNum = 30;
mockTask(totalNum);

var serverCluster = new ServerCluster(16);

var curr = getCurrentTime();


function runScheduler() {
    serverCluster.printCurrentStatus();
    if(queue.length > 0) {
        var task = queue.dequeue();
        var numOfAvailableNodes = serverCluster.checkAvailableNum();

        if(numOfAvailableNodes < task.nodeNum) {
            serverCluster.preemption(task.nodeNum);
        }
        serverCluster.process(task);
        serverCluster.checkAllTasks();
    }else {
        serverCluster.checkAllTasks();
    }
    if(completedQueue.length > 0) {
        colorLog(completedQueue.length.toString() + " tasks have been done!!", "success");
    }
    if(completedQueue.length == totalNum) {
        clearInterval(handler);
        colorLog("All the tasks have been done!", "error");
        colorLog("Takes " + (getCurrentTime() - curr) / 1000.0.toString() + " seconds", "error");
    }

}


var handler = setInterval(runScheduler, 50);




/*

Q1 : Is there other statistic function do we need;



*/
