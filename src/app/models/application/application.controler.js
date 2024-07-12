import applicationModel from "../../../db/moduels/application/application.model.js"
import asyncHandler from "../../utils/asyncHandler.js"
import xlsx from 'xlsx'

export const getApps = asyncHandler(
    async (req,res,next)=>{
        let apps =await applicationModel.find({})
        let formattedData  = apps.map((doc)=>{
                let result = {
                created_at:doc.createdAt,
                updated_at:doc.updatedAt,
                userResume:doc.userResume,
                }

                result._id = doc._id.toString()
                result.jopId = doc.jopId.toString()
                result.companyId = doc.companyId.toString()
                result.userId = doc.userId.toString()

           
                doc.userTechSkills.map((skill)=>{
                    result[`techSkill`] = skill
                })
                doc.userSoftSkills.map((skill)=>{
                    result[`softSkill`] = skill
                })
                return result
            })

        

        const ws = xlsx.utils.json_to_sheet(formattedData);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'apps');
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
        res.setHeader('Content-Disposition', 'attachment; filename=output.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return res.send(buffer).json({msg:'done'});

        // return res.status(200).json({apps})
        
    }
)