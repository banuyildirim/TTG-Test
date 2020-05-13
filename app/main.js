const textFile = "bankAccounts.txt";

//findMissing function, takes two arrays and returns the missing elements from the second array
findMissing = (firstArray, secondArray) => {
    let resultArray = [];
    for( let i=0; firstArray.length > i; i++ ) {
        // find missing elements and push new array 
        if(secondArray.indexOf(firstArray[i]) === -1) {
            resultArray.push(firstArray[i]);
        }
    }
    return resultArray;
}

//Takes an array and a number then rotates the array around the number
rotate = (array, number) => {
    let resultArray = [];
    const index = array.indexOf(number);
    resultArray = array.splice(0, index + 1);
    return array.concat(resultArray);
}

let allText;
readTextFile = (file) => {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}
readTextFile(textFile);

getAccounts = () => {
    //Lines that gotten are added into the accounts array
    let lines = [];
    allText.split(/\r?\n/).forEach(function(line){
        lines.push(line);
    });

    //Creates array from the separate cases that consists of accounts
    let firstLineOfNextCase = 1;
    let totalAccounts = [];
    for (let i=0; i<parseInt(lines[0]); i++) {
        let accounts = [];
        for(let j = 0; j<parseInt(lines[firstLineOfNextCase]); j++) {
            accounts.push(lines[firstLineOfNextCase+1+j]);
        }
        totalAccounts.push(accounts);
        firstLineOfNextCase += parseInt(lines[firstLineOfNextCase]) + 2; // 2 = case account + emyty line
    }
    return totalAccounts;
}

//Sorts the accounts gotten and prints in developer console.
sortAccounts = () => {
    let totalAccounts = getAccounts();
    for(let a=0; a<totalAccounts.length; a++) {
        for(b=0; b<totalAccounts[a].length; b++) {
            let count = 0;
            totalAccounts[a].map((item,i) => {
                if(item === totalAccounts[a][b]) {
                    count ++;
                }
            });
            console.log(totalAccounts[a].sort()[b] + " " +count + "\n")
        }
        console.log("\n");
    }
}
sortAccounts();
