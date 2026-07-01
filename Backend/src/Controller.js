const User = require("./userModel.js");

const InsertEnquiry = async(req,res)=>{
   try {
        const {username, email, phone, message} = req.body;
        if(!username || !email || !phone || !message){
            return res.status(400).json({success: false, msg: "Enter all required input"});
        }  
        const isExist = await User.findOne({email});
        
        if(isExist){
            return res.status(400).json({success: false, msg: "User Already exist. Please login"});
        }

        const userCreated = await User.create({username, email, phone, message});
        
        return res.status(201).json({
            message: "User Registered successfully",
            user:{
                username: userCreated.username,
                email: userCreated.email,
                phone: userCreated.phone,
                message: message
            }
        })
   } catch (error) {
      res.status(500).send({success: false, msg: "Enquiry server error"});
      console.log(error);
   }
}

const ViewEnquiry = async (req, res) => {
  try {
    const enquiryList = await User.find();

    return res.status(200).json({
      success: true,
      enquiry: enquiryList
    });

  } catch (error) {
    console.error(error);
      return res.status(500).json({success: false, msg: "Failed to fetch enquiry list"});
  }
};

const DeleteEnquiry = async(req, res)=>{
    try {
        const enquiryId = req.params.id;
        await User.findByIdAndDelete(enquiryId)
         return res.status(200).json({success: true, msg:'User Enquiry Deleted'})
            
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, msg: "Failed to fetch enqiry list"});
    }   
}

const UpdateEnquiry = async (req, res) => {

    try {

        const enquiryId = req.params.id;

        const updatedData = await User.findByIdAndUpdate(
            enquiryId,
            req.body,
            { new: true }
        );

        return res.status(200).json({
            success: true,
            updatedData
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            msg: "Update Error"
        });
    }
};

module.exports = {InsertEnquiry, ViewEnquiry,DeleteEnquiry,UpdateEnquiry};
