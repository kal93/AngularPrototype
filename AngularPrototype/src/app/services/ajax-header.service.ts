import { Injectable } from '@angular/core';

@Injectable()
export class AjaxHeaderService {
    ///<summary>
    ///This method utitlizes the jQuery ajax syntax to call
    ///the service & sets the authentication token to the header.
    ///</summary>
    public $ajax(actionUrl: string, actionParameters: string, actionMethod: string,
        successCallback: any, isAsync?: boolean) {
        let token = sessionStorage.getItem('AuthenticationToken');
        $.ajax({
            url: actionUrl,
            data: actionParameters,
            method: actionMethod,
            //setting async to false will hold the script until response
            //comes i.e synchrounous call.This is an optional parameter is
            //true by default
            async: isAsync,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            },
        }).done(successCallback)

        $(document).ajaxError(function (e, xhr, opt) {
            console.log(opt.url + '\t' + xhr.status + '\t' + xhr.statusText);
        });
    };
}