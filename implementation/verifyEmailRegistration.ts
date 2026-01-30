import { T_verifyEmailRegistration } from "../types/api/verifyEmailRegistration";
import { User } from "../types/model/table/User";

export const verifyEmailRegistration: T_verifyEmailRegistration = async req => {
    const user = await User.findOneBy({ email: req.body.email });
    if (!user) {
        throw new Error(`Email not found`);
    }

    if(user.verified_at){
        throw new Error(`Akun sudah terverifikasi`);
    }

    if (user.email_verification_token === req.body.verification_token){
        user.verified_at = new Date();
        await user.save();

        return true;
    }
    else {
        throw new Error(`Token verifikasi tidak sesuai`)
    }
}
