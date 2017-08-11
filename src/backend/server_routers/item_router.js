/**
 * 本方法仅在/backend/process文件中调用，传入外部环境参数
 * 
 * @param router node路由器
 * @param sc 协议发送端
 */
module.exports = function client(router, sc, passport) {
    router.all('/item_getManageList', function(req, res, next) { //项目管理首页查询
        let param = req.body;
        const stuff = sc.instanceRequest("FinancingProjectInfoTask", "selectFinancingProjectInfo", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [
            param.industry,
            param.phase,
            param.regionCode,
            param.keyword,
            param.pageNo,
            param.pageSize,
            param.isRestart
        ];
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        });
    });
    //获取项目头部信息
    router.all('/item_getHeadData', function(req, res, next) {
        const stuff = sc.instanceRequest("ProjectManageTask", "seletProjectManageTaskTatol", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [];
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        });
    });
    //获取项目详情
    router.all('/item_getManageDetail', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FinancingProjectTask", "selectFinancingProject", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [param.id];
        sc.send(stuff).then((resp) => {
            let item=resp.object;
            item.auxiliary=resp.auxiliary;
            res.json(item);
        });
    });
    //项目展示
    router.all('/item_getProjectShow', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FinancingProjectShowTask", "selectFinancingProjectShow", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [param.id];
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        });
    });
    //获取融资方案
    router.all('/item_getFinancingPlan', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FinancingPlanTask", "selectFinancingPlan", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [param.id];
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        });
    });
    //获取有限合伙人
    router.all('/item_getPartnerInfo', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("LimitedParatnerShipTask", "selectLimitedParatnerShipById", "customerManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [param.id];
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        });
    });
    //获取行家建议
    router.all('/item_getExpertAd', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("ExpertAdviceTask", "selectExpertAdvice", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [param.id];
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        });
    });
    //获取领投意向
    router.all('/item_getLeadAd', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("LeadInvestorIntentionTask", "selectLeadInvestorIntention", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [param.id];
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        });
    });
    //获取时间信息
    router.all('/item_getTimeInfo', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FinancingProjectTask", "selectFinancingProjectTimeById", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [param.id];
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        });
    });
    //获取登记注册信息
    router.all('/item_getAuthInfo', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("EnterpriseAccountTask", "selectRegistrationAuthority", "enterpriseManger");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [param.id]; //enterpriseId
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        });
    });
    //获取审核结论
    router.all('/item_getResultInfo', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FinancingProjectTask", "selectValidateConclusionById", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [param.id];
        sc.send(stuff).then((resp) => {
            res.json(resp.object)
        });
    });
    //编辑时间信息
    router.all('/item_updateTimeInfo', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FinancingProjectTask", "updateFinancingProjectTimeById", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [
            param.id,
            param.reserveBegin,
            param.reserveEnd,
            param.subscriptionStartTime,
            param.subscriptionEndTime,
            param.crowdFundingBegin,
            param.crowdFundingEnd
        ];
        sc.send(stuff).then((resp) => {
            res.json(resp.head)
        });
    });
    //编辑有限合伙人
    router.all('/item_updatePartnerInfo', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("LimitedParatnerShipTask", "updateLimitedParatnerShipById", "customerManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [{
            name: param.name,
            code: param.code,
            licence: param.licence,
            bankName: param.bankName,
            bankProvince: param.bankProvince,
            bankCity: param.bankCity,
            bankAccount: param.bankAccount,
            financingProjectId: param.id,
            bankOrgnizationName: param.bankOrgnizationName,
            protocol: param.protocol
        }];
        sc.send(stuff).then((resp) => {
            res.json(resp.head)
        });
    });
    //关联有限合伙人
    router.all('/item_createPartnerInfo', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("LimitedParatnerShipTask", "createLimitedParatnerShip", "customerManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [{
            name: param.name,
            code: param.code,
            licence: param.licence,
            bankName: param.bankName,
            bankProvince: param.bankProvince,
            bankCity: param.bankCity,
            bankAccount: param.bankAccount,
            financingProjectId: param.id,
            bankOrgnizationName: param.bankOrgnizationName,
            protocol: param.protocol
        }];
        sc.send(stuff).then((resp) => {
            res.json(resp.head)
        });
    });
    //编辑认证注册信息
    router.all('/item_updateAuthInfo', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("EnterpriseTask", "updateRegistrationAuthority", "enterpriseManger");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [
            param.accountId,
            param.accountApprovalNumber,
            param.depositBank,
            param.basicDepositAccountNumber,
            param.businessLicenseURL,
            param.accountLicenceURL,
            param.queryAuthorization,
            param.queryPassword,
            param.pinCode,
            param.activationCode,
            param.userLoginName,
            param.accountName,
            param.customerCode
        ];
        sc.send(stuff).then((resp) => {
            res.json(resp.head)
        });
    });
    //审核项目
    router.all('/item_setResultInfo', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FinancingProjectTask", "validateFinancingProject", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [
            param.id,
            param.flag,
            param.pass,
            param.rejection
        ];
        sc.send(stuff).then((resp) => {
            res.json(resp.head)
        });
    });
    //重新发起项目
    router.all('/item_reset', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FinancingProjectTask", "restartFinancingProject", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [
            param.id
        ];
        sc.send(stuff).then((resp) => {
            res.json(resp.head)
        });
    });
    //放款申请
    router.all('/item_lend', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("DealManageAppropriationTask", "appropriationPayplan", "dealManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [
            param.id,
            param.initiatorId
        ];
        sc.send(stuff).then((resp) => {
            res.json(resp.head)
        });
    });
    //银账信息审核确定判断 返回false,还未签约。
    router.all('/item_isAuthInfo', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("LinkTouSignInfoService", "checkProjectSign", "undersign");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [
            param.projectId
        ];
        sc.send(stuff).then((resp) => {
            res.json(resp.object);
        });
    });
    //银账信息审核
    router.all('/item_authInfo', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("EnterpriseAccountTask", "updateStatus", "enterpriseManger");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [
            param.id,
            param.status,
            param.refuseReason
        ];
        sc.send(stuff).then((resp) => {
            res.json(resp.head)
        });
    });
    //创建项目返回id
    router.all('/item_createProject', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FinancingProjectTask", "createFinancingProject", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [param.type];
        sc.send(stuff).then((resp) => {
            res.json(resp.object);
        });
    });
    //编辑项目信息
    router.all('/item_updateProject', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FinancingProjectTask", "updateFinancingProject", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [param];
        sc.send(stuff).then((resp) => {
            res.json(resp.head);
        });
    });
    //创建融资方案
    router.all('/item_createFinancingPlan', function(req, res, next) {
        let param = req.body;
        const stuff = sc.instanceRequest("FinancingPlanTask", "createFinancingPlan", "projectManage");
        stuff.auxiliary = {
            [passport]: req.session.passport
        };
        stuff.items = [param];
        sc.send(stuff).then((resp) => {
            res.json(resp.object);
        });
    });
    //创建融资凭证
    router.all('/item_createInvestedEvidence', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("InvestedEvidenceTask", "createInvestedEvidence", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [param];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
        })
        //获取融资凭证
    router.all('/item_getInvestedEvidence', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("InvestedEvidenceTask", "selectInvestedEvidenceByPlanId", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [param.id];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
        })
        //根据融资方案id删除融资凭证
    router.all('/item_deleteInvestedEvidence', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("InvestedEvidenceTask", "deleteInvestedEvidence", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [param.id];
            sc.send(stuff).then((resp) => {
                res.json(resp.head);
            });
        })
        //创建融资企业
    router.all('/item_createEnterprise', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("EnterpriseTask", "createEnterprise", "enterpriseManger");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [ //没有的传空
                param.name,
                param.creditCode,
                '',
                param.existProjectNum,
                '',
                '',
                '',
                param.industry
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
        })
        //更新融资企业
    router.all('/item_updateEnterprise', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("EnterpriseTask", "updateEnterprise", "enterpriseManger");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [ //没有的传空
                param.enterpriseId,
                param.name,
                param.creditCode,
                param.businessLicenseURL,
                param.existProjectNum,
                param.brief,
                param.representativeId,
                param.addressCode,
                param.industry
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.head);
            });
        })
        //添加融资企业团队成员
    router.all('/item_createEnterpriseMember', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("EnterpriseMemberTask", "createEnterpriseMember", "enterpriseManger");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.imageURL,
                param.name,
                param.identNumber,
                param.mobileNumber,
                param.education,
                param.position,
                param.profile,
                param.enterpriseId,
                param.marriage || 1
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp);
            });
        })
        //编辑团队成员
    router.all('/item_updateEnterpriseMember', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("EnterpriseMemberTask", "updateEnterpriseMember", "enterpriseManger");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [ //没有的传空
                param.id, //成员id
                param.imageURL,
                param.name,
                param.identNumber,
                param.mobileNumber,
                param.education,
                param.position,
                param.profile,
                param.marriage || 1
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.head);
            });
        })
        //删除团队成员（假删除）
    router.all('/item_updateEnterpriseMemberStatusById', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("EnterpriseMemberTask", "updateStatusById", "enterpriseManger");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.id, //成员id
                param.status //成员状态（0无效   1有效 2禁用)
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.head);
            });
        })
        //修改融资方案
    router.all('/item_updateFinancingPlan', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("FinancingPlanTask", "updateFinancingPlan", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.projectId,
                param
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.head);
            });
        })
        //投资人条件创建
    router.all('/item_createInvestorCondition', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("InvestorConditionTask", "createInvestorCondition", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.head);
            });
        })
        //获取投资人条件
    router.all('/item_selectInvestorConditionByFinId', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("InvestorConditionTask", "selectInvestorConditionByFinId", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.id
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
        })
        //投资人条件更新
    router.all('/item_updateInvestorCondition', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("InvestorConditionTask", "updateInvestorConditionById", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.head);
            });
        })
        //创建项目详细介绍
    router.all('/item_createDetailedIntroduction', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("DetailedIntroductionTask", "createDetailedIntroduction", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
        })
        //获取详细介绍
    router.all('/item_getDetailedIntroduction', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("DetailedIntroductionTask", "selectDetailedIntroduction", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.id
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
        })
        //修改详细
    router.all('/item_updateDetailedIntroduction', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("DetailedIntroductionTask", "updateDetailedIntroduction", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.head);
            });
        })
        //行家领投选择列表
    router.all('/item_getPersons', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("CustomerInfo4ShowTask", "selectCustomerInfo4Show", "customerManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.type,
                param.pageNo,
                param.pageSize,
                param.keyWord,
                param.industry
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
        })
        //创建参考资料
    router.all('/item_createMaterial', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("MaterialTask", "createMaterial", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.head);
            });
        })
        //删除参考资料
    router.all('/item_deleteMaterialByFinId', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("MaterialTask", "deleteMaterialByFinId", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.id
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.head);
            });
        })
        //获取参考资料
    router.all('/item_selectMaterialByProjectId', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("MaterialTask", "selectMaterialByProjectId", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.id
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
        })
        //获取客户列表
    router.all('/item_getCustomerList', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("CustomerInfoTask", "selectCustomerInfo", "customerManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                '',
                'F',
                param.keyword,
                param.pageNo,
                param.pageSize
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
        })
        //获取回报计划
    router.all('/item_getRewardPlan', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("RewardPlanTask", "selectRewardPlan", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.id
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
        })
        //获取项目投资人信息列表
    router.all('/item_getInvestUserInfo', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("DealManageTask", "getInvestUserInfoForShow", "dealManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.id
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
        })
        //根据id查询销售份额
    router.all('/item_getSalesQuota', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("SalesQuotaTask", "selectSalesQuota", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.id
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
        })
        //内容确定
    router.all('/item_contentConfirm', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("FinancingProjectTask", "affirmProjectForEdit", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.id
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.head);
            });
        })
        //内容确定专用项目修改接口item_updateProject
    router.all('/item_updateProjectForAffrim', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("FinancingProjectTask", "updateFinancingProjectForAffrim", "projectManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.head);
            });
        })
        //讨论组接口
    router.post('/SubjectDiscussManage/:methods', function(req, res, next) {
        switch (req.params.methods) {
            //子评论查询
            case "subjectDiscussAllQuery":
                {
                    const stuff = sc.instanceRequest("SubjectDiscussManage", "subjectDiscussAllQuery", "contentManage");
                    stuff.items = [req.body.subject_id, req.body.pageNumber, req.body.pageVolume]
                    stuff.auxiliary = {
                        [passport]: req.session.passport
                    };
                    sc.send(stuff).then((resp) => {
                        console.log(resp);
                        res.json(resp.object)
                    });
                    break;
                }
                //子评论创建
            case "subjectDiscussCreate":
                {

                    const stuff = sc.instanceRequest("SubjectDiscussManage", "subjectDiscussCreate", "contentManage");
                    stuff.items = [req.body.subject_id, req.body.discuss_content, req.body.discuss_picture, req.body.actorId]
                    stuff.auxiliary = {
                        [passport]: req.session.passport
                    };
                    sc.send(stuff).then((resp) => {
                        console.log(resp);
                        res.json(resp.object)
                    });
                    break;
                }
                //删除子评论
            case "subjectDiscussDeleteById":
                {

                    const stuff = sc.instanceRequest("SubjectDiscussManage", "subjectDiscussDeleteById", "contentManage");
                    stuff.items = [req.body.discuss_id, req.body.subject_id, req.body.del_user_id]
                    stuff.auxiliary = {
                        [passport]: req.session.passport
                    };
                    sc.send(stuff).then((resp) => {
                        console.log(resp);
                        res.json(resp.object)
                    });
                    break;
                }
                // 项目评论查询
            case "projectSubjectAllQuery":
                {
                    const stuff = sc.instanceRequest("ProjectSubjectManage", "projectSubjectAllQuery", "contentManage");
                    stuff.items = [req.body.pageNumber, req.body.pageVolume, req.body.projectId]
                    stuff.auxiliary = {
                        [passport]: req.session.passport
                    };
                    sc.send(stuff).then((resp) => {
                        console.log(resp);
                        res.json(resp.object)
                    });
                    break;
                }
                //项目评论创建
            case "projectSubjectCreate":
                {
                    const stuff = sc.instanceRequest("ProjectSubjectManage", "projectSubjectCreate", "contentManage");
                    stuff.items = [req.body.subject_content, req.body.actorId, req.body.project_id, req.body.subject_picture]
                    stuff.auxiliary = {
                        [passport]: req.session.passport
                    };
                    sc.send(stuff).then((resp) => {
                        console.log(resp);
                        res.json(resp.object)
                    });
                    break;
                }
                //项目评论删除
            case "projectSubjectDeleteById":
                {
                    const stuff = sc.instanceRequest("ProjectSubjectManage", "projectSubjectDeleteById", "contentManage");
                    stuff.items = [req.body.subject_id, req.body.del_user_id]
                    stuff.auxiliary = {
                        [passport]: req.session.passport
                    };
                    sc.send(stuff).then((resp) => {
                        console.log(resp);
                        res.json(resp.object)
                    });
                    break;
                }
                //项目评论点赞
            case "subjectLikeCreate":
                {
                    const stuff = sc.instanceRequest("SubjectLikeManage", "subjectLikeCreate", "contentManage");
                    stuff.items = [req.body.subject_id, req.body.actorId]
                    stuff.auxiliary = {
                        [passport]: req.session.passport
                    };
                    sc.send(stuff).then((resp) => {
                        console.log(resp);
                        res.json(resp.object)
                    });
                    break;
                }
                //项目评论点赞查询
            case "subjectLikeCount":
                {
                    const stuff = sc.instanceRequest("SubjectLikeManage", "subjectLikeCount", "contentManage");
                    stuff.items = [req.body.subject_id]
                    stuff.auxiliary = {
                        [passport]: req.session.passport
                    };
                    sc.send(stuff).then((resp) => {
                        console.log(resp);
                        res.json(resp.object)
                    });
                    break;
                }
                //取消点赞项目评论
            case "subjectLikeCancel":
                {
                    const stuff = sc.instanceRequest("SubjectLikeManage", "subjectLikeCancel", "contentManage");
                    stuff.items = [req.body.subject_id, req.body.actorId]
                    stuff.auxiliary = {
                        [passport]: req.session.passport
                    };
                    sc.send(stuff).then((resp) => {
                        console.log(resp);
                        res.json(resp.object)
                    });
                    break;
                }
                //查询是否点赞项目评论
            case "subjectLikeQueryByActorID":
                {
                    const stuff = sc.instanceRequest("SubjectLikeManage", "subjectLikeQueryByActorID", "contentManage");
                    stuff.items = [req.body.subject_id, req.body.actorId]
                    stuff.auxiliary = {
                        [passport]: req.session.passport
                    };
                    sc.send(stuff).then((resp) => {
                        console.log(resp);
                        res.json(resp.object)
                    });
                    break;
                }
        }
    })

    //通过企业名称获取项目工商信息
    router.all('/item_getBusinessInfo', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("TCEnterpriseBusinessInfoTask", "selectEnterpriseBusinessInfoList", "riskManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.name,
                2
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
        })
    //通过项目id获取反欺诈信息（里面有项目信用评级）
    router.all('/item_getCreditAntiFraud', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("TCCreditAntiFraudTask", "selectCreditAntiFraud", "riskManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.id
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
    })
    //获取第三方征信报告
    router.all('/item_getThirdReport', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("TCCreditReportTask", "selectTCCreditReport", "riskManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.id
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
    })
    //获取是否注资申请
    router.all('/item_getIsFun', function(req, res, next) {
            let param = req.body;
            const stuff = sc.instanceRequest("transactionInquiry.PayplanInquiry", "getPayplanByProjectId", "dealManage");
            stuff.auxiliary = {
                [passport]: req.session.passport
            };
            stuff.items = [
                param.id,
                param.num,
                param.size
            ];
            sc.send(stuff).then((resp) => {
                res.json(resp.object);
            });
    })
    
}