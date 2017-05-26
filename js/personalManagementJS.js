/**
 * Created by caiyifei on 2017/1/31.
 */

var app=angular.module('myApp', []);

app.filter('startFrom', function () {
    return function (data, start) {
        return data.slice(start);
    };
});

app.controller('userCtrl', function($scope) {
    $scope.fName = '';
    $scope.lName = '';
    $scope.passw1 = '';
    $scope.passw2 = '';
    $scope.users = [
        {id:1, fName:'Hege', lName:"Pege", titl:"Manager", sex:"Male", age:30 },
        {id:2, fName:'Kim',  lName:"Pim", titl:"Employee", sex:"Female", age:29 },
        {id:3, fName:'Sal',  lName:"Smith", titl:"Employee", sex:"Male", age:28 },
        {id:4, fName:'Jack', lName:"Jones", titl:"Employee", sex:"Male", age:27 },
        {id:5, fName:'John', lName:"Doe", titl:"Employee", sex:"Female", age:26 },
        {id:6, fName:'Peter',lName:"Pan", titl:"Employee", sex:"Female", age:25 },
        {id:7, fName:'Agnes', lName:"Ambrose", titl:"Manager", sex:"Female", age:24 },
        {id:8, fName:'Randell',  lName:"Armorer", titl:"Employee", sex:"Male", age:23 },
        {id:9, fName:'Roger',  lName:"Appelbie", titl:"Employee", sex:"Male", age:22 },
        {id:10, fName:'Ellen', lName:"Bedyke", titl:"Employee", sex:"Female", age:21 },
        {id:11, fName:'Juliane', lName:"Barker", titl:"Employee", sex:"Female", age:28 },
        {id:12, fName:'Ambrose',lName:"Bednell", titl:"Employee", sex:"Male", age:29 },
        {id:13, fName:'Bryan', lName:"Carnabbe", titl:"Manager", sex:"Male", age:30 },
        {id:14, fName:'Den',  lName:"Clarke", titl:"Employee", sex:"Male", age:31 },
        {id:15, fName:'Besse',  lName:"Coltard", titl:"Employee", sex:"Female", age:32 },
        {id:16, fName:'Alexander', lName:"Dalton", titl:"Employee", sex:"Male", age:33 },
        {id:17, fName:'Francis', lName:"Eden", titl:"Employee", sex:"Male", age:34 },
        {id:18, fName:'Jarret',lName:"Gack", titl:"Employee", sex:"Male", age:35 }
    ];
    $scope.pageSize=5;
    $scope.currentPage=1;
    //$scope.totalItems=Math.ceil($scope.users.length/$scope.pageSize);
    $scope.totalPages=Math.ceil($scope.users.length/$scope.pageSize);
    $scope.firstPage=1;
    $scope.lastPage=$scope.totalPages;

    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;
    $scope.hideform = true;
    $scope.index=0;
    $scope.idCount=19;

    $scope.editUser = function(id) {
        $scope.hideform = false;
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.fName = '';
            $scope.lName = '';
            $scope.passw1 = '';
            $scope.passw2 = '';
            $scope.titl = '';
            $scope.sex = '';
            $scope.age = '';
        } else {
            $scope.edit = false;
            for(var i=0;i<$scope.users.length;i++){
                if($scope.users[i].id==id){
                    $scope.index=i;
                    $scope.fName = $scope.users[i].fName;
                    $scope.lName = $scope.users[i].lName;
                    $scope.passw1 = $scope.users[i].passWord;
                    $scope.passw2 = '';
                    $scope.titl = $scope.users[i].titl;
                    $scope.sex = $scope.users[i].sex;
                    $scope.age = $scope.users[i].age;
                    break;
                }
            }
        }
    };

    $scope.$watch('passw1',function() {$scope.test();});
    $scope.$watch('passw2',function() {$scope.test();});
    $scope.$watch('fName', function() {$scope.test();});
    $scope.$watch('lName', function() {$scope.test();});
    $scope.$watch('titl', function() {$scope.test();});
    $scope.$watch('sex', function() {$scope.test();});
    $scope.$watch('age', function() {$scope.test();});


    $scope.test = function() {
        if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.fName.length ||
            !$scope.lName.length ||
            !$scope.passw1.length ||
            !$scope.passw2.length ||
            !$scope.titl.length ||
            !$scope.sex.length ||
            $scope.age<=0)){
            $scope.incomplete = true;
        }
    };



    $scope.saveUser=function (e, fN, lN, pa, ti, se, ag) {
        if(e){
            var newUser={
                id:$scope.idCount,
                fName:fN,
                lName:lN,
                passWord:pa,
                titl:ti,
                sex:se,
                age:ag
            }
            $scope.idCount++;
            $scope.users.push(newUser);

            $scope.totalPages=Math.ceil($scope.users.length/$scope.pageSize);
            $scope.lastPage=$scope.totalPages;

        }else{
            $scope.users[$scope.index].fName=fN;
            $scope.users[$scope.index].lName=lN;
            $scope.users[$scope.index].passWord=pa;
            $scope.users[$scope.index].titl=ti;
            $scope.users[$scope.index].sex=se;
            $scope.users[$scope.index].age=ag;
        }
        $scope.hideform = true;
    };

    $scope.sortFun = function(x) {
        $scope.myOrderBy = x;
    };

    $scope.deleteUser=function (id) {
        for(var i=0;i<$scope.users.length;i++){
            if($scope.users[i].id==id){
                $scope.users.splice(i,1);

                $scope.totalPages=Math.ceil($scope.users.length/$scope.pageSize);
                $scope.lastPage=$scope.totalPages;
                if($scope.currentPage> $scope.totalPages){
                    $scope.currentPage--;
                }
            }
        }
    }

    $scope.prePage=function () {
        $scope.currentPage--;
    }

    $scope.nextPage=function () {
        $scope.currentPage++;
    }

    $scope.toFirstPage=function () {
        $scope.currentPage=1;
    }

    $scope.toLastPage=function () {
        $scope.currentPage=$scope.lastPage;
    }
});
