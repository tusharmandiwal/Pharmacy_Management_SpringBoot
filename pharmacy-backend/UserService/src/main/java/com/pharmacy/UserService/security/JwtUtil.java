package com.pharmacy.UserService.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.pharmacy.UserService.modal.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private static final String SECRET = "your-very-long-base64-encoded-secret-key-for-hs384";
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", user.getName());
        claims.put("email", user.getEmail());
        claims.put("phone", user.getPhone());
        claims.put("role", user.getRole().name());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SECRET_KEY)
                .compact();
    }

	public String extractEmail(String token) {
		return extractClaim(token, Claims::getSubject);
	}
	
    public String extractName(String token) {
        return extractAllClaims(token).get("name", String.class);
    }

    public String extractPhone(String token) {
        return extractAllClaims(token).get("phone", String.class);
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }


	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		Claims claims = Jwts.parserBuilder()
				.setSigningKey(SECRET_KEY)
				.build()
				.parseClaimsJws(token)
				.getBody();
		return claimsResolver.apply(claims);
	}
	
	   private Claims extractAllClaims(String token) {
	        return Jwts.parserBuilder()
	                .setSigningKey(SECRET_KEY)
	                .build()
	                .parseClaimsJws(token)
	                .getBody();
	    }

	public boolean validateToken(String token, UserDetails userDetails) {
	    final String email = extractEmail(token);
	    return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}


	private boolean isTokenExpired(String token) {
		return extractClaim(token, Claims::getExpiration).before(new Date());
	}
}
