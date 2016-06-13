 <script language="JavaScript" type="text/JavaScript">
            function check_upload(prm_this)
            {
                window.opener.document.acForm.upload_facility.value=prm_this;
                window.close();
            }
        </script>
		
		
		/* Inner HTML */
		
		form_elements = $("#userForm").serialize();
    $.ajax({
        type: "POST",
        async:false,
        data: form_elements,
        url: "validate_forms.php",
        success: function(msg){
            if( msg.length == 0) {
                document.userForm.submit();
            }
            else {
                $("#div_form_errors").attr("innerHTML",msg);
            }
        }
    });
	
	/* Ajax checking functionality */
	
	function checkformrefAvailability()
{
    

    var manual_ref_no = document.loForm.manual_ref_no.value;
    if(manual_ref_no!="")
    {
        var str='manual_ref_no='+manual_ref_no;

    }   

    if(manual_ref_no != "")
    {
        document.getElementById("ajaxLoader").innerHTML = "Checking availability of Form Reference number. Please wait...";
        document.getElementById("ajaxLoader").style.display="none";
        http = getHTTPObject(); // We create the HTTP Object
        var url = "checkformrefAvailability.php";

        http.open("POST", url, true);
        //http.open("GET", url+ '?username='+username+'&password='+ password, true);
        http.onreadystatechange = handleHttpGetResponse;

        //this is done for post method
        http.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
        http.send(str);
    }
}

function handleHttpGetResponse()
{
    if (http.readyState == 4)
    {
        message = http.responseText;
        if(message=='')
        {
            document.loForm.form_ref_avability.value=1;
            document.getElementById("ajaxLoader").style.display="none";
            return true;
        }else {  
            document.loForm.form_ref_avability.value=0;
            // document.getElementById("ajaxLoader").innerHTML = "Form Reference "+manual_ref_no+" Already exists.<br/>"+message+" is available. would you like to create this username? ";
                       
          //  document.getElementById("ajaxLoader").innerHTML = "Form Reference "+manual_ref_no+" Already exists. ";
            var str = document.loForm.manual_ref_no.value;
            var manual_ref_no = str.toUpperCase();
            alert("Form Reference "+manual_ref_no+" Already exists." );
            return;
        }
    }
}


form_elements = $("#userForm").serialize();
    $.ajax({
        type: "POST",
        async:false,
        data: form_elements,
        url: "validate_forms.php",
        success: function(msg){
            if( msg.length == 0) {
                document.userForm.submit();
            }
            else {
                $("#div_form_errors").attr("innerHTML",msg);
            }
        }
    });		


***********************************************************************

function checkformrefAvailability( referanceNumber ){
    var actualResponce = true;
    if(referanceNumber.length>0){
        var newParams = 'formref='+referanceNumber;
        $.ajax({
            type: "POST",
            data:newParams,
            async: false,
            url: "check_form_ref.php",
            success: function(msg){
                if(msg.length>0){
                    actualResponce = false;
                }
            }
        });
    }
    return actualResponce;
}

***************************************************************************

var answer = confirm("Are you sure want to re-send activation mail")
    if (answer){
        $("#myDiv_"+prm_userId).attr("style","display:block;");
        $.ajax({
            type: "GET",
            async:true,
            //data: form_elements,
            url: "resend_lo_activation_mail.php?user_Id="+prm_userId,
            success: function(msg){
                 $("#myDiv_"+prm_userId).attr("style","display:none;");
                alert('Mail sent');                
            }
        });
    }
	
	
	/* to check all check box */
	
	function makeAllCheck(){
    var formName = document.getElementById("listBoxForm");

    if($("#checkAll").attr("checked")){
        //$("#userIdConent #checkAll_users").attr("checked",true);
        for(i=0,n=formName.elements.length;i<n;i++)
        {
            if(formName.elements[i].name)
            {
                if(formName.elements[i].name.indexOf("checkAll_users") != -1)
                    formName.elements[i].checked = true;
            }
        }

    }else{
        //$("#userIdConent #checkAll_users").attr("checked",false);
        for(i=0,n=formName.elements.length;i<n;i++)
        {
            if(formName.elements[i].name)
            {
                if(formName.elements[i].name.indexOf("checkAll_users") != -1)
                    formName.elements[i].checked = false;
            }
        }
    }
}

function update_reprint()
{
    var cnt=document.appRefForm.cbxCount.value;
    
    flag=false;
    for(i=0;i<cnt;i++)
    {        
        if(document.getElementById("chkBox_"+i).checked)
        {            
            flag=true;
            break;
        }
    }

    if(!flag)
    {
        alert("Please select atleast one application");
        return false;
    }

    document.appRefForm.action="rePrintThese.php";
    document.appRefForm.submit();
}

/* to get checked checkbox ids */

selectedIds = $("input[type=checkbox]:checked").serializeArray();


if(selectedIds.length > 0){
        $("#archiveDiv").css('display','block');
    }else{
        $("#archiveDiv").css('display','none');
    }

	
/* Regular expression checking */

var expval = new  RegExp("^([0-9]{12})|([L][M][0-9]{6}[\-][0-9]{2})$");

	  certno=document.getElementById("certno").value;
	  issuedt=document.getElementById("discissue").value;
	  issdate=issuedt.split('/');
	  var dday=issdate[0];
	  var dmonth=issdate[1];
	  var dyear=issdate[2];
	  // given date of birth	
	  var Issdate=new Date(dyear,dmonth-1,dday);
	  var dtissue=Math.ceil(Issdate.getTime());
	
	    if(certno == "")
	  {
	         alert("Please enter Disclosure Number ");
	         document.getElementById("certno").focus();
		   return;
	  }else if(!certno.toUpperCase().match(expval))
                  {
                         alert("You have entered an invalid CRB certificate number. \nValid Format is : 123456789012 or LM123456-78");
                             return;
                  }
	
	    if(certno != "" && (dtissue>dttoday))
	  {
	         alert("Disclosure Issue date Cannot be in future for Cert No. "+certno);
	         document.getElementById("discissue").focus();
		   return;
	  }
	    if(certno != "" && issuedt=="")
	  {
	         alert("Please enter the Disclosures issue date for Cert No. "+certno);
	         document.getElementById("discissue").focus();
		   return;
	  }
      if(!dateBeforeOneMonth(issuedt)){
            alert("Disclosure Issue date Cannot be before one month.");
	        document.getElementById("discissue").focus();
		    return;
      }

    document.appRefForm.submit();
}


function checknumber(e) {

                e = e || window.event;
             key = e.which || e.keyCode;
          var prohibited = "*|,\\\":<>[]{}`';()+/!^@_&=?.~$#%abcdefghijknopqrstuvwxyzABCDEFGHIJKNOPQRSTUVWXYZ";
          if (prohibited.indexOf(String.fromCharCode(key)) >= 0)
            return false;
        }






