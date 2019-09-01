// 바로응답-담당자알림-담당자배정 - 공무원용
export function asign_talk(worker, complain, username, tel){
    return {
        msg:`[포항시청-바로응답]\n\n${worker}님 바로응답처리가 배정됬습니다.\n\n<신고내용>\n${complain}\n\n신고자: ${username}\n연락처 :${tel}`,
        code:'TM0001'
    }
}

export function send_state_to_citizen(username, state, comment, worker, tel){
    return {
        msg:`[포항시청-바로응답]\n\n${username} 님 신고하신 바로응답건은 ${state} 상태 입니다.\n\n<바로응답 내용>\n${comment}\n\n담당자: ${worker}\n문의 : ${tel}`,
        code:'TM0011'
    }
}
// 	바로응답-신고자알림-처리완료2
export function complete_talk(username, proc, worker, tel){
    return {
        msg:`[포항시청-바로응답]\n\n${username} 님 신고하신 바로응답건에 대한 처리가 완료 되었습니다.\n\n<처리내용>\n${proc}\n\n담당자: ${worker}\n문의 : ${tel}`,
        code:'TM0013'
    }
}
export function cancel_talk(worker, report, username, tel){
    return {
        msg:`[포항시청-바로응답]\n\n${worker} 님 바로응답 담당자 배정이 취소 되었습니다.\n\n<신고내용>\n${report}\n\n신고자: ${username}\n연락처 :${tel}`,
        code:'TM0016'
    }
}
// 바로응답-담당자알림-담당자배정 - 시민용
export function asign_talk_citizen(username){
    return {
        msg:`[포항시청-바로응답]\n\n${username} 님 신고하신 바로응답건에 대한 담당자가 배정되었습니다.`,
        code:'TM0017'
    }
}

export function accept_talk_citizen(username){
    return {
        msg:`[포항시청-바로응답]\n\n${username} 님 신고하신 바로응답건이 접수 되었습니다.`,
        code:'TM0019'
    }
}


export function complete_talk_officer(worker,report,username,tel){
    return {
        msg:`[포항시청-바로응답]\n\n${worker} 님 바로응답 처리가 완료되었습니다.\n\n<신고내용>\n${report}\n\n신고자: ${username}\n연락처 :${tel}   `,
        code:'TM0018'
    }
}
