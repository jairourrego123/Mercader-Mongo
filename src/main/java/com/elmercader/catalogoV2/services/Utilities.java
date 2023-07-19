package com.elmercader.catalogoV2.services;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Utilities {

    /**
     * Validate Regex
     * @param pattern
     * @param candidate
     * @return  True if regex is correct
     */
    public static boolean validateRegex(String pattern, String candidate){
        Pattern pattern_obj = Pattern.compile(pattern,Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern_obj.matcher(candidate);
        return  matcher.find(); // retorna verdaderoo o falso si cumple con el patron
    }

    /**
     * Validate plate
     * @param plate
     * @return True if regex is correct
     */

    public static boolean validatePlate(String plate){ //static permite que no tenga que crear un objeto apra llamar estas funciones
        String platePattern = "[A-Z]{3}[0-9]{3}|[A-Z]{3}[0-9]{2}[A-Z]";
        return validateRegex(platePattern,plate);//Valida que la placa cumpla con el patron
    }

    /**
     * ValidateEmail
     * @param email
     * @return True if regex is correct
     */
    public static boolean validateEmail(String email){
        String emailPattern = "[a-z][a-z0-9_]*@(gmail.com|outlook.com|usa.edu.co)";
        return validateRegex(emailPattern,email);
    }

}
